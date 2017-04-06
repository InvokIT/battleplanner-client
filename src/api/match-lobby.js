// @flow
import noop from "lodash/fp/noop";
import once from "lodash/fp/once";
import isNumber from "lodash/fp/isNumber";
import isEmpty from "lodash/fp/isEmpty";
import {retryAsync} from "../util/retry";
import jwtStore from "../jwt-store";

type apiProps = {
    matchId: string,
    onMatchStateUpdate: (state: any) => void,
    onPlayerListUpdate: (players: []) => void,
    onConnecting?: () => void,
    onConnected?: () => void,
    onClose?: () => void,
    connectionRetries?: number
};

class MatchLobbyApi {
    props: apiProps;
    _socket: ?WebSocket;

    constructor(props: apiProps) {
        this.props = props;

        this.props.onConnecting = this.props.onConnecting || noop;
        this.props.onConnected = this.props.onConnected || noop;
        this.props.onClose = this.props.onClose || noop;

        if (!isNumber(this.props.connectionRetries)) {
            this.props.connectionRetries = 5;
        }

        this._socket = null;
    }

    async open(): Promise<MatchLobbyApi> {
        if (this._socket) {
            return this;
        } else {
            await this._openSocket();
            await this._authenticateConnection();
            await this._listenForMessages();
            return this;
        }
    }

    close(): void {
        if (this._socket) {
            this._closeSocket();
            this._onClose();
        }
    }

    assignPlayerToTeam(playerId: string, team: number, teamSlot: number): void {
        this._withSocket(socket => {
            socket.send(JSON.stringify({
                type: "state-change",
                name: "update-team-player-slot",
                params: {
                    team: team,
                    teamSlot: teamSlot,
                    playerId: isEmpty(playerId) ? null : playerId
                }
            }));
        });
    }

    lockTeams(): void {
        this._withSocket(socket => {
            socket.send(JSON.stringify({
                type: "state-change",
                name: "teams-complete"
            }));
        });
    }

    _withSocket(fn: (WebSocket) => void) {
        if (this._socket) {
            fn(this._socket);
        }
    }

    async _openSocket() {
        this.props.onConnecting && this.props.onConnecting();

        const wsUrl = `ws:${(process:Object).env.REACT_APP_API_ORIGIN}/matches/${this.props.matchId}`;

        const socket = await retryAsync(
            this.props.connectionRetries || 5,
            () => {
                return new Promise((resolve, reject) => {
                    const socket = new WebSocket(wsUrl);
                    socket.addEventListener("error", once((e) => reject(new Error(`Unable to connect to ${wsUrl}`))));
                    socket.addEventListener("open", once((e) => resolve(socket)));
                });
            });

        socket.addEventListener("close", this._onClose.bind(this));

        this._socket = socket;
    }

    _authenticateConnection() {
        return new Promise((resolve, reject) => {
            // $FlowFixMe
            this._socket.addEventListener("message", once(msg => {
                const data = JSON.parse(msg.data);
                if (data.type === "auth-response" && !!data.success) {
                    this.props.onConnected && this.props.onConnected();
                    resolve();
                } else {
                    throw new Error(`Invalid authorization response: ${data}`);
                }
            }));

            // $FlowFixMe
            this._socket.send(JSON.stringify({
                type: "auth",
                token: jwtStore.get()
            }));
        });
    }

    async _listenForMessages() {
        // $FlowFixMe
        this._socket.addEventListener("message", this._onMessage.bind(this));
    }

    _closeSocket() {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }

    _onMessage(msg: MessageEvent) {
        if (typeof msg.data !== "string") {
            throw new Error(`Invalid data type: ${typeof msg.data}`);
        }

        const data = JSON.parse(msg.data);
        switch (data.type) {
            case "match-state-update":
                const state = data.state;
                this.props.onMatchStateUpdate(state);
                break;
            case "players-update":
                const players = data.players;
                this.props.onPlayerListUpdate(players);
                break;
            default:
                console.error(`Received unknown message '${data.type}'.`);
        }
    }

    _onClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }
}

export default MatchLobbyApi;
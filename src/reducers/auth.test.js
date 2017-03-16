import authReducer from "./auth";
import authBegin from "../actions/auth-begin";
import authFinish from "../actions/auth-finish";
import authStages from "../auth-stages";

describe("reducers/auth", () => {

    describe("action auth_begin", () => {

        it("should change state.stage to authorizing", () => {
            expect(authReducer(undefined, authBegin()).stage).toBe(authStages.authorizing);
        });

    });

    describe("action auth_finish", () => {

        const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGVhbUlkIjoiNzY1NjExOTgwMzg3NDExOTciLCJzdGVhbUlkZW50aWZpZXIiOiJodHRwOi8vc3RlYW1jb21tdW5pdHkuY29tL29wZW5pZC9pZC83NjU2MTE5ODAzODc0MTE5NyIsImRpc3BsYXlOYW1lIjoiUXZhemFyIiwiYXZhdGFyVXJsIjoiaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbWNvbW11bml0eS9wdWJsaWMvaW1hZ2VzL2F2YXRhcnMvZTYvZTY3ZDFlOWNhOGE2Mzk5NDIxZjdmMDRmZDI3OWUzM2Q1YmI4NTBmMl9mdWxsLmpwZyIsImlhdCI6MTQ4OTYyNDMwMywiZXhwIjoxNDkwMjI5MTAzLCJpc3MiOiJpbnZva2l0LmRrIiwic3ViIjoiMWRmMDI4NzEtMzNjMi00Mzc0LWE1YWQtZGQwYjlmNDk5MWI4In0.dQzcpffuuvMzR8T-wnosmf_KkDczaQ0KEBvecYrf9EPDHTMbOQ1rwTjImvDFnaSEa9-E4S8VW5wFXFlSqARvSNesL-Z0Kp0ztGGf8NiASOru_z5fZnq5jLiCT1nXoV8F5V-gRYsbDUTxPo8fLSBD2zywrRrZsLHxTqGwSMr-96uljgVkgLr_RkWSzlZoyFXQcd5qyqTNQGoRMGPeC1KgOBJ9q7DbgtfrJ9eNRwgX2A761EIR1nQO9nXvxI-fVjqk2FJjEdSXwSWFc-aikJGajrbm_yaSLGLzas1RMHnK91toffrc9J0_NeRRfaQLK67IqXZJBolOniGVUWaDSMIQ4g";
        const jwtUser = {
            "steamId": "76561198038741197",
            "steamIdentifier": "http://steamcommunity.com/openid/id/76561198038741197",
            "displayName": "Qvazar",
            "avatarUrl": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e6/e67d1e9ca8a6399421f7f04fd279e33d5bb850f2_full.jpg",
            "id": "1df02871-33c2-4374-a5ad-dd0b9f4991b8"
        };

        it("should change state.stage to authorized", () => {
            expect(authReducer(undefined, authFinish(jwt)).stage).toBe(authStages.authorized);
        });

        it("should change state.jwt to be the action jwt", () => {
            expect(authReducer(undefined, authFinish(jwt)).jwt).toBe(jwt);
        });

        it("should change state.user to include data from the jwt", () => {
            expect(authReducer(undefined, authFinish(jwt)).user).toEqual(jwtUser);
        });

        // it("should store the jwt in localStorage['user-token']", () => {
        //     window.localStorage.clear();
        //     window.localStorage.setItem.mockClear();
        //
        //     authReducer(undefined, authFinish(jwt));
        //
        //     const setItemCalls = window.localStorage.setItem.mock.calls;
        //
        //     const callArgs = setItemCalls.find(args => args[0] === "user-token");
        //     expect(callArgs).toBeDefined();
        //     expect(callArgs[1]).toBe(jwt);
        // });

    });

});
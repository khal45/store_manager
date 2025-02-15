import { assert } from "chai";
import { request } from "chai-http";
import server from "../../server.js";

describe("auth route tests", () => {
  it("should login a user that exists", (done) => {
    request
      .execute(server)
      .keepOpen()
      .post("/api/v1")
      .send({ username: "johndoe", password: "johndoe@admin" })
      .end((error, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });

  it("should not login a user that does not exist", (done) => {
    request
      .execute(server)
      .keepOpen()
      .post("/api/v1")
      .send({ username: "invaliduser", password: "invaliduser@attendant" })
      .end((error, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, "user does not exist");
        done();
      });
  });

  it("should not login a user with incorrect password", (done) => {
    request
      .execute(server)
      .keepOpen()
      .post("/api/v1")
      .send({ username: "johndoe", password: "invalid" })
      .end((error, res) => {
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, "incorrect password");
        done();
      });
  });
});

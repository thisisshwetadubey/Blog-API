const chai = require("chai");
const chaiHttp = require("chai-http");
const index = require("../index");

const { expect } = chai; 

chai.use(chaiHttp);


describe("Post", () => {
  it("creates a new post", (done) => {
    chai
      .request(index)
      .post("/api/posts")
      .send({
        title: "sample test case",
        content: "sample test content",
        category_id: "653a8eeb87ed310a71d6c590"
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("type").to.equal("Success");
        expect(res.body).to.have.property("data").to.equal("Successfully created");
        done();
      });
  })

  it("delete a post", (done) => {
    chai
    .request(index)
    .post("/api/posts/653a8eeb87ed310a71d6c590")
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("type").to.equal("Success");
        expect(res.body).to.have.property("data").to.equal("Post deleted sucessfully");
        done();
      });
   })

  it("update a post", (done) => {
    chai
      .request(index)
      .put("/api/posts/653cb5c435cdca3b749b2440")
      .send({
        title: "sample tiitle update",
        content: "sample content update"
    })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("type").to.equal("Success");
        expect(res.body).to.have.property("data").to.equal("Post updated sucessfully");
        done()
      });
  })

  it("should return list of posts", (done) => {
    chai
      .request(index)
      .get("/api/posts")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("type", "Success");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("array");
        expect(res.body.data).to.have.length.above(0);
        done();
      });
  })

  it("return a single post", (done) => {
    chai
      .request(index)
      .get("/api/posts/653cb5c435cdca3b749b2440")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("type", "Success");
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data).to.have.property("_id").that.is.a("string");
        expect(res.body.data).to.have.property("title").that.is.a("string");
        expect(res.body.data).to.have.property("content").that.is.a("string");
        expect(res.body.data).to.have.property("category_id").that.is.a("string");
        expect(res.body.data).to.have.property("createdAt").that.is.a("string");
        expect(res.body.data).to.have.property("updatedAt").that.is.a("string");
        expect(res.body.data).to.have.property("__v").that.is.a("number");
        done();
      });
  });

  it("should return latest post", (done) => {
    chai
      .request(index)
      .get("/api/posts/latest")
      .then((res) => {
        res.should.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("type", "Success");
  
        const data = res.body.data;
        expect(data).to.be.an("array");
  
        const uniqueCategories = new Set();
  
        for (const item of data) {
          expect(item).to.have.property("_id").that.is.a("string");
          expect(item).to.have.property("title").that.is.a("string");
          expect(item).to.have.property("content").that.is.a("string");
          expect(item).to.have.property("createdAt").that.is.a("string");
          expect(item).to.have.property("updatedAt").that.is.a("string");
          expect(uniqueCategories.has(item.category)).to.be.false;
          uniqueCategories.add(item.category);
        }
        done();
      })
      .catch((err) => {
        done(err);
      });
  })
});

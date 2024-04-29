import { should } from "chai";
describe("fetch api test", ()=> {
it("should list movies from api", ()=>{
    cy.visit("http://localhost:5173")
    cy.get("input#searchText").type("Halloween{enter}")
    cy.get("button").click()
    cy.get("#movie-container").should("have.length.greaterThan",0)
})

    it("should list my mocked movies", ()=>{
        cy.visit("http://localhost:5173")
        cy.intercept("http://omdbapi.com/*", 
        {Search:[{
            "Title": "Halloween Ends",
            "Year": "2022",
            "imdbID": "tt10665342",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZTg1Y2Q3MzctMDlkOS00OGE1LWE4MjUtNmJjNDNkZmM2YmVkXkEyXkFqcGdeQXVyMjY5ODI4NDk@._V1_SX300.jpg"
        },
        {
            "Title": "Halloween III: Season of the Witch",
            "Year": "1982",
            "imdbID": "tt0085636",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BN2YzYjI0MWYtYWUyZS00ZDQ4LWEzN2EtMDU4NDJmNjA2ZWFiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "Halloween II",
            "Year": "2009",
            "imdbID": "tt1311067",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjE2OTEzODI0NF5BMl5BanBnXkFtZTcwMTE4MTY2Mg@@._V1_SX300.jpg"
        },
        ]
    }).as("myapicall")

    cy.get("button:first").click()
    cy.get(".movie").should("have.length",3)
    cy.get("h3:first").should("have.text", "Halloween Ends")

    });

    it("should ge right URL",()=> {
        cy.visit("")
        cy.intercept("http://omdbapi.com/*", {
            Search: [  {
                "Title": "Halloween 4: The Return of Michael Myers",
                "Year": "1988",
                "imdbID": "tt0095271",
                "Type": "movie",
                "Poster": "https://m.media-amazon.com/images/M/MV5BYWNiNjBhZjAtMzVkNi00MTJiLWI0NGQtODE2NmIyNmU2OTQwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
            }
        ]}
        ).as("myapicall")
    cy.get("input#searchText").type("Halloween 4: The Return of Michael Myers")
    cy.get("button").click()
    cy.wait("@myapicall").its("request.url").should("contain","Halloween")
    })

    it("should show show error massage", ()=> {
        cy.visit("http://localhost:5173")
        cy.get("input#searchText")
        cy.get("button").click()
        cy.get("div#movie-container").should("have.text","Inga sökresultat att visa")
    })
})



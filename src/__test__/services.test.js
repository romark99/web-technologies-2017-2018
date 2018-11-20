require("../db");
const services = require("../services");

describe("Services", () => {
  describe("getMovies()", () => {
    test("return movies", async () => {
      const movies = await services.getMovies();
      //console.log("WHAT IS IT: " + movies);
      expect(Array.isArray(movies)).toBe(true);

      movies.forEach(element => {
        expect(element).toHaveProperty("id");
        expect(element).toHaveProperty("title");
        expect(element).toHaveProperty("popularity");
        expect(element).toHaveProperty("vote_count");
        expect(element).toHaveProperty("release_date");
        expect(element).toHaveProperty("overview");
      });
    });
  });

  describe("getMovieById(id)", () => {
    test("id == 400535, should return some movie", async () => {
      const movie = await services.getMovieById(400535);
      expect(typeof movie).toBe("object");
      expect(movie).toHaveProperty("id", 400535);
      expect(movie).toHaveProperty("title", "Sicario: Day of the Soldado");
      expect(movie).toHaveProperty("popularity");
      expect(movie).toHaveProperty("vote_count");
      expect(movie).toHaveProperty("release_date");
      expect(movie).toHaveProperty("overview");
    });

    test("id == 45, no movie with such id, should return undefined", async () => {
      const movie = await services.getMovieById(45);
      //expect(movie).toBeUndefined();
      expect(movie).toBeNull();
    });
  });

  describe("getMoviesBySubstring(substring)", () => {
    test("substring == 'Harry', should return Harry Potter movie", async () => {
      const movies = await services.getMoviesBySubstring("Harry");
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(1);
      expect(movies[0]).toHaveProperty(
        "title",
        "Harry Potter and the Philosopher's Stone"
      );
    });

    test("substring == 'a', should return some movies", async () => {
      const movies = await services.getMoviesBySubstring("a");
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBeGreaterThan(10);
    });

    test("substring == 'q123a', should return undefined", async () => {
      const movies = await services.getMoviesBySubstring("q123a");
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(0);
    });
  });

  describe("getPagination(offset, limit)", () => {
    test("offset == 2, limit == 5, should return 3 - 7 movies", async () => {
      const movies = await services.getPagination(2, 5);
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(5);
    });

    test("offset == 2000, limit == 5, offset is too high, should return []", async () => {
      const movies = await services.getPagination(2000, 5);
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(0);
    });

    // test("offset == -100, limit == 5, offset is too low, should return []", async () => {
    //     const movies = await services.getPagination(-100, 5);
    //     expect(Array.isArray(movies)).toBe(true);
    //     expect(movies.length).toBe(0);
    // });

    test("offset == 5, limit == 0, max 0 movies on page, should return []", async () => {
      const movies = await services.getPagination(5, 0);
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(0);
    });
  });

  describe("sortMovies(field, direction)", () => {
    test("field == 'id', direction == 'asc', should return movies sorted by id in ascending order", async () => {
      const movies = await services.sortMovies("id", "asc");
      expect(Array.isArray(movies)).toBe(true);
      const ids = movies.map(a => a.id);
      let prev;
      const sorted = ids.reduce((acc, cur) => {
        if (typeof prev === "undefined" || prev < cur) {
          prev = cur;
          return acc;
        } else {
          prev = cur;
          return acc + 1;
        }
      }, 0);
      expect(sorted).toBe(0);
    });

    test("field == 'title', direction == 'desc', should return movies sorted by title in descending order", async () => {
      const movies = await services.sortMovies("id", "desc");
      expect(Array.isArray(movies)).toBe(true);
      const ids = movies.map(a => a.id);
      let prev;
      const sorted = ids.reduce((acc, cur) => {
        if (typeof prev === "undefined" || prev > cur) {
          prev = cur;
          return acc;
        } else {
          console.log("HERE: " + prev + " " + cur);
          prev = cur;
          return acc + 1;
        }
      }, 0);
      expect(sorted).toBe(0);
    });

    test("field == 'title', direction == 'fhjgj', should return []", async () => {
      const movies = await services.sortMovies("title", "fhjgj");
      expect(Array.isArray(movies)).toBe(true);
      expect(movies.length).toBe(0);
    });

    test("field == 'vguh', direction == 'asc', should return all movies in some order", async () => {
      try {
        await services.sortMovies("vguh", "asc");
        expect(true).toBe(false);
      } catch (e) {
        expect(e).toHaveProperty("name", "SequelizeDatabaseError");
      }
    });
  });
});

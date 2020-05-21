const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.displayResults = async function () {
    const res = await axios(viewController.endpoint);
    this.result = res.data.items;
  };

  return {
    Search,
  };
})();

const viewController = (function () {
  let endpoint;
  function getValue(e) {
    let language = e.target.textContent;
    endpoint = `https://cors-anywhere.herokuapp.com/https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;

    return language;
  }

  return {
    endpoint,
    getValue,
  };
})();

const controller = (function () {
  const state = {};

  const eventListeners = function () {
    document
      .querySelector(".languages-container")
      .addEventListener("click", (e) => {
        const languages = [
          "All",
          "JavaScript",
          "Ruby",
          "Java",
          "C++",
          "CSS",
          "Python",
          "Go",
        ];
        languages.forEach(function (cur) {
          if (e.target.textContent === cur) {
            handleResults(e);
          }
        });
      });
  };

  const handleResults = function (e) {
    // 1. get the query
    let query = viewController.getValue(e);
    // 2. Create object and save it in state
    state.search = new searchController.Search(query);
  };

  return {
    init: function () {
      eventListeners();
    },
  };
})();
controller.init();
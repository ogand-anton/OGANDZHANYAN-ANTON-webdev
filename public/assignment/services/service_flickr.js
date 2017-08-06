(function() {
    angular
        .module("WamApp")
        .factory("flickrService", flickrService);

    function flickrService($http) {
        var key = "48756df7fe8d6239416d850156b97773";
        var secret = "5bdf6a920e7f2877";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text = TEXT";

        return {
            searchPhotos: searchPhotos
        };

        function searchPhotos(searchTerm) {
            return $http({
                url: "https://api.flickr.com/services/rest",
                method: "GET",
                params: {
                    method: "flickr.photos.search",
                    format: "json",
                    api_key: key,
                    text: searchTerm
                }
            }).then(function (res) {
                return res.data;
            });
        }
    }
})();
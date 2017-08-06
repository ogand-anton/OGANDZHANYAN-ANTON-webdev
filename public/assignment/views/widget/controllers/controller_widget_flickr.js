(function () {
    angular
        .module("WamApp")
        .controller("widgetFlickrController", widgetFlickrController);

    function widgetFlickrController($routeParams, $location, sharedService, widgetService, flickrService) {
        var vm = this,
            uid, wid, pid, wgid;

        vm.searchPhotos = searchPhotos;
        vm.selectPhoto = selectPhoto;

        (function init() {
            _parseRouteParams();
            _fetchTemplates();
            _initHeaderFooter();
            _loadContent();
        })();

        function searchPhotos(searchTerm) {
            flickrService
                .searchPhotos(searchTerm)
                .then(function (photoData) {
                    photoData = photoData.replace("jsonFlickrApi(", "");
                    photoData = photoData.substring(0, photoData.length - 1);
                    photoData = JSON.parse(photoData);
                    vm.photos = photoData.photos;
                });
        }

        function selectPhoto(photo){
            var url = "https://farm" + photo.farm + ".staticflickr.com/" +
                photo.server + "/" +
                photo.id + "_" +
                photo.secret + "_b.jpg";

            widgetService
                .updateWidget(wgid, {url: url})
                .then(function(res){
                    if (!res.msg) {
                        $location.url("/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                    } else {
                        console.log(res.msg);
                    }
                });
        }

        function _fetchTemplates(){
            vm.templates = sharedService.getTemplates();
        }

        function _initHeaderFooter() {
            vm.navHeader = {
                leftLink: {
                    href: "#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget",
                    iconClass: "glyphicon-triangle-left",
                    name: "Widgets"
                },
                name: "Search Flickr"
            };
            vm.navFooter = [
                {href: "#!/user/" + uid, iconClass: "glyphicon-user", sizeClass: "col-xs-6"},
                {
                    href: "#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget/new",
                    iconClass: "glyphicon-plus",
                    sizeClass: "col-xs-6"
                }
            ];
        }

        function _loadContent() {

        }

        function _parseRouteParams() {
            uid = $routeParams["uid"];
            vm.uid = uid;

            wid = $routeParams["wid"];
            vm.wid = wid;

            pid = $routeParams["pid"];
            vm.pid = pid;

            wgid = $routeParams["wgid"];
            vm.wgid = wgid;
        }
    }
})();
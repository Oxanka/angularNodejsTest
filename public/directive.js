angular.module('myApp.directive', [])
    .directive('ngUpload', function ($upload) {
        return {
            restrict: "EA",
            scope: {
                accept: '@',
                multiple: '=',
                ngUpload: "&"
            },
            link(scope, element) {
                var accept = scope.accept || false;
                var multiple = scope.multiple || false;

                element.on('click', function (event) {
                    $upload.open({
                        accept: accept,
                        multiple: multiple
                    }, function (files, dataUrl) {
                        scope.ngUpload({
                            $files: files,
                            $result: dataUrl
                        });
                    });
                });
            }
        }
    })
    .directive("datepicker", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "dd.mm.yy",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };
            elem.datepicker(options);
        }
    }

    })
    .directive('headerpage', function() {
    return {
        templateUrl: './header/header.html',
        replace: true
    }
    });
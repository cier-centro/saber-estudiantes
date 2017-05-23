cont_angular.controller('uploadQuestionaryCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicScrollDelegate',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicScrollDelegate) {
        $scope.data = {"path":"hola"};
        $scope.findfile = function(){
          console.log("hizo click")
          const electron= nodeRequire('electron').remote;
          console.log("electron caragado")
    			const dialog = electron.dialog;
          console.log("dialog caragado")
          dialog.showOpenDialog(function (fileNames) {
            if (fileNames === undefined) return;
            var fileName = fileNames[0];
            $scope.data.path = fileName;
            console.log($scope.data.path)
          });
          this.value = $scope.data.path
        };

    }]);

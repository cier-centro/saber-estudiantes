cont_angular.controller('uploadQuestionaryCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicScrollDelegate',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicScrollDelegate) {
        $scope.data = {"path":"hola"};
        $scope.findfile = function(){
          console.log("hizo click")
          const electron= nodeRequire('electron').remote;
          console.log("electron caragado")
    			const dialog = electron.dialog;
          console.log("dialog caragado")
          dialog.showOpenDialog({filters:[{name: 'Prueba tipo saber', extensions: ['prueba']}]}, function (fileNames) {
            if (fileNames === undefined) return;
            var fileName = fileNames[0];
            $scope.data.path = fileName;
            $scope.$apply()
            //console.log($scope.data.path)
          });
          //document.getElementById("filepathInput").value = $scope.data.path
        };

        $scope.loadFile=function(){
          var fs = nodeRequire('fs');
          fs.readFile($scope.data.path, 'utf8', function (err, data) {
            if (err) return console.log(err);
            lines = data.split('\n');
            var nombreprueba = lines[0];
            var preguntas = lines[1].split(',')
            console.log(nombreprueba)
            console.log(preguntas);
            // data is the contents of the text file we just read
          });
        }

        $scope.cancel=function(){
          $state.go("start")
        }

    }]);

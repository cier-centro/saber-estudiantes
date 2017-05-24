cont_angular.controller('uploadQuestionaryCtrl', ['$scope', '$stateParams', '$ionicPopup', '$state', '$ionicScrollDelegate','$http','globals',
    function ($scope, $stateParams, $ionicPopup, $state, $ionicScrollDelegate,$http,globals) {
        $scope.data = {"path":"C:\\Users\\Programador\\Desktop\\primera.prueba"};
        $scope.findfile = function(){
          const electron= nodeRequire('electron').remote;
    			const dialog = electron.dialog;
          dialog.showOpenDialog({filters:[{name: 'Prueba tipo saber', extensions: ['prueba']}]}, function (fileNames) {
            if (fileNames === undefined) return;
            var fileName = fileNames[0];
            $scope.data.path = fileName;
            $scope.$apply()
            //console.log($scope.data.path)
          });
          //document.getElementById("filepathInput").value = $scope.data.path
        };
        $scope.preguntasArchivo = []
        $scope.loadFile=function(){
          var fs = nodeRequire('fs');
          fs.readFile($scope.data.path, 'utf8', function (err, data) {
            if (err) return console.log(err);
            lines = data.split('\n');
            var nombreprueba = lines[0];
            selected_questions = lines[1].split(',')
            max_questions = selected_questions.length;
            var sample = selected_questions[0].split('#')[0];
            selected_level = parseInt(sample)
            selected_asignare = sample.replace(""+selected_level,"")[0]
            $scope.getQuesitonsData()
            timer = setInterval(function(){
                globals.total_time++;
                document.getElementById("time_counter").innerHTML = "Tiempo Total: " + Math.floor(globals.total_time/60)+":"+(globals.total_time%60);
                console.log(globals.total_time);
            }, 1000);
            $state.go("askaquestion")
            // data is the contents of the text file we just read
          });
        }

        $scope.getQuesitonsData = function () {
            $scope.data.max_questions = max_questions;
      			var url = "data/questions.json";
      			if(ionic.Platform.isAndroid()){
      				url = "/android_asset/www/data/questions.json";
      			}
      			$http.get(url).success(function(response){
              for (var file_question in selected_questions){
                var quest = selected_questions[file_question];
                var dba = quest.split("#")[0];
                if (questions_data[dba] == undefined){
                  questions_data[dba] = {"code":dba,"questions":[]}
                }
                dba_questions = response[dba].questions
                for (var db_question in dba_questions){
                    if(dba_questions[db_question].cod_question==quest){
                      questions_data[dba].questions.push(dba_questions[db_question]);
                      console.log(questions_data);
                    }
                }
              }
      			});
        };

        $scope.cancel=function(){
          $state.go("start")
        }

    }]);

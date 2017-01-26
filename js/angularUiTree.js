(function () {
  'use strict';

  angular.module('demoApp')
    .controller('angularUiTreeCtrl', ['$scope','$http', function ($scope,$http) {
      $scope.jsonArr = [];
      $scope.tree2 = []
      $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        if(nodeData.hasOwnProperty("nodes"))
        {
          var paraArr = [];
          for(var i=0;i<2;i++)
          {
            paraArr.push({
              id:nodeData.id * 10 + nodeData.nodes.length,
              title:nodeData.title + '.' + (nodeData.nodes.length + 1)+"_para"+(paraArr.length+1),
              Value:nodeData.title + '.' + (nodeData.nodes.length + 1)+"_Value "+(paraArr.length+1)
            })
          }
          var nodeArr = {id:nodeData.id * 10 + nodeData.nodes.length,
                        title: nodeData.title + '.' + (nodeData.nodes.length + 1),
                        para:paraArr};
          if(nodeData.id.toString().length == 1)
          {
            nodeArr["node"] = [];
          }
          nodeData.nodes.push(nodeArr);
        }
        else
          alert("Child Node Can not be appended");
      };

      $scope.newItem = function(){
        var paraArr = [];
        if($scope.tree2 != "")
        {
            for(var i=0;i<4;i++)
            {
              paraArr.push({
                id:($scope.tree2.length+1)+""+($scope.tree2.length+1),
                title:"Level "+($scope.tree2.length+1)+"_para"+(paraArr.length+1),
                Value:"Level "+($scope.tree2.length+1)+"_Value "+(paraArr.length+1),
              });
            }
            $scope.tree2.push({
              id: $scope.tree2.length +1,
              title: "Level "+($scope.tree2.length+1),
              para:paraArr,
              nodes:[]
            });
        }
        else
            alert("JSON is blank, Add a new Json");
              
      };
        
      $scope.newJSON = function(){
        $http.get("data.json")
        .then(function(response) {
        $scope.tree2 = response.data;
        });
      };
        
      $scope.addJson = function(){
          if($scope.tree2 != ""){
                if($scope.jsonArr.indexOf(JSON.stringify($scope.tree2)) < 0)
                    $scope.jsonArr.push(JSON.stringify($scope.tree2));
                else
                    alert("Json is already added");
            }
          else
              alert("can not add blank json");
      };
      
      $scope.removeJson = function(data){
        var index = $scope.jsonArr.indexOf(data);
        $scope.jsonArr.splice(index, 1);
          console.log($scope.jsonArr.length);
        if($scope.jsonArr.length > 0)
            $scope.tree2 = JSON.parse($scope.jsonArr[0]);
        else
            $scope.tree2 = []; 
      };

      $scope.loadJsonData = function(json){
          $scope.tree2 = JSON.parse(json);
      };

      $http.get("angularUItree/data.json")
        .then(function(response) {
        $scope.tree2 = response.data;
        });
    }]);

}());

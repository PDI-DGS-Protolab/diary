angular.module('app').controller('day',['$rootScope', '$scope', 'webdb',function(rootScope, scope, webdb){
  var item = {a:0};
  var init = function(){
    scope.item = item;
    rootScope.$on('changeCurrentDay', _updateItem);
    scope.$on("loadCollectionFromRs", _applyChangeInFront);
  };

  var _updateItem = function(){
    var day = rootScope.currentDay;
    if(day){
      item = _getItem(day);
    }
  };

  var _getItem = function(day){
    var obj = {note:[],photo:[],position:[]};
    webdb.getNoteByDay(day, _loadCollectionFromRs(obj.note) );
    webdb.getPostionByDay(day, _loadCollectionFromRs(obj.position) );
    webdb.getPhotoByDay(day, _loadCollectionFromRs(obj.photo) );
    return obj;
  };

  var _loadCollectionFromRs = function(to){
    var out = function(tx,rs){
      var rows = rs.rows;
      var n = rows.length;
      while(n--){
        to.push(rows.item(n));
      }
      scope.$emit("loadCollectionFromRs");
    };
    return out;
  };

  var _applyChangeInFront = function(){
    scope.$apply(_apply);
  };

  var _apply = function(){
    scope.item = item;
  };

  init();

}]);
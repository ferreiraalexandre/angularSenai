(function(){
	'use strict';
	angular.module("tarefas").factory("tarefasFactory",Factory);
	Factory.$inject = ["$resource"];
	
	function Factory($resource){
		var url = "http://localhost:8080/tarefas-rest/api/tarefas/:id";
		var resource = $resource(url, null, {
			'edit': {method: 'PUT'}
		});
		var factory = {
				getAll : fnGetAll,
				search : fnSearch,
				save : fnSave,
				edit : fnEdit,
				remove : fnDelete
		};
		
		function fnGetAll(){
			return resource.get().$promise;
		}
		function fnSearch(param){
			return resource.get({search:param}).$promise;
		}
		function fnSave(tarefa){
			return resource.save({},tarefa).$promise;
		}
		function fnEdit(id,tarefa){
			return resource.edit({id:id},tarefa).$promise;
		}
		function fnDelete(id){
			return resource.remove({id:id}).$promise;
		}		

		return factory;
	}
})();
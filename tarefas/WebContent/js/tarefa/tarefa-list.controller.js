(function(){
	'use strict';
	
	angular.module("tarefas").controller("tarefaListController",Controller);
	
	Controller.$inject = ["lowercaseFilter","tarefasFactory","toaster"];
	
	function Controller(lc,tarefasFactory,toaster){
		var self = this;
		
		self.pesquisa = "";
		
		function init(){
			self.pesquisar();
		}
		
		self.pesquisar = function (){
			if(self.pesquisar != ""){
				tarefasFactory.search(self.pesquisar).then(function(result){
					if(result.data){
						self.tarefas = result.data;
					}else{
						self.tarefas = [];
					}
				}).catch(function(result){
					console.error(result);
				});
			}else{
				tarefasFactory.getAll().then(function(result){
					if(result.data){
						self.tarefas = result.data;
					}else{
						self.tarefas = [];
					}
				}).catch(function(result){
					console.error(result);
				});
			}
		}		
		
		init();
	}
})();
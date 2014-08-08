/**
 * Handles all modal dialog boxes in UI
 * Allows only one dialog to be active at a time.
 */

angular.module('gp.services.dialogs', [])
    .factory('dialogService', [function dialogFactory() {
        var controllerScope, dialog, DialogService;
        
        dialog = {};
        
        DialogService = {
            dialog: function (config) {
                if (config) {
                    dialog.title = config.title;
                    dialog.template = config.template;
                    dialog.data = config.data;
                    dialog.actions = config.actions;
                }
                
                if (controllerScope) {
                    controllerScope.updateDialog(dialog);
                    this.show();
                }
                
                return dialog;
            },
            
            show: function () {
                if (controllerScope) {
                    controllerScope.active = true;
                }
                return this;
            },
            
            hide: function () {
                if (controllerScope) {
                    controllerScope.active = false;
                }
                return this;
            },
            
            wire: function (scope) {
                controllerScope = scope;
            }
        };

        return DialogService;
    }])
    .controller('dialogController', ['$scope', 'dialogService', function($scope, dialogService) {
        dialogService.wire($scope);
        $scope.updateDialog = function (dialog) {
            $scope.dialog = dialog;
            return this;
        };
    }]);

public with sharing class DropDownController {
    @AuraEnabled
    
    Public static List<String> getObjList(){
        List<String> objects = new List<String>();
        List<Schema.SObjectType> objList = Schema.getGlobalDescribe().Values();     
        for(SObjectType obj:objList){
            objects.add(obj.getDescribe().getName());
        }
        
        return objects;
    }

    
}

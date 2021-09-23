public with sharing class MultiSelectFieldController {
    
    @AuraEnabled
    Public static List<String> getRelatedFieldsfromObj(String Obj){

        List<String> objectsFields = new List<String>();

        SObjectType objType = Schema.getGlobalDescribe().get(Obj);
        Map<String,Schema.SObjectField> relatedFields = objType.getDescribe().fields.getMap();

        for(String Keys:relatedFields.keyset()){
            
            objectsFields.add(relatedFields.get(Keys).getDescribe().getName());

        }
        System.debug(objectsFields);

        return objectsFields;


       
    }
}

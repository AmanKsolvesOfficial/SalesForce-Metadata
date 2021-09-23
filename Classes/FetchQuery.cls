public with sharing class FetchQuery {
    @AuraEnabled
    public static List<sObject> fetchQueryRecords(String Query) {
        List<sObject> result=Database.query(Query);
        System.debug(Query);
        return result;

    }

    
    //innerclass
    //label,fieldname
    //map

}

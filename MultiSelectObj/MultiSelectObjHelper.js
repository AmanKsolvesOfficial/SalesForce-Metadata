({
    resetArray : function(event) {
        const queryArr=[]

        //Getting the selected Field
        var selectedOptionValue = event.getParam("value").toString();
        console.log(selectedOptionValue.toString())

        //Pushing the field into array to make a query
       queryArr.push(selectedOptionValue)

       return queryArr

    }
    // fireEvent:function(Fields,query){
    //     const appevent=$A.get("e.c:QueryRecordResultApplicationEvent");
    //     appevent.setParams({
          
    //         Query:query
    //     })
    //     appevent.fire()
    // }
    
    
    
})

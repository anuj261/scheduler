
/***
 *  To process the task in executable order and check cyclic dependency
 *  
 *  function parameters 
 *  1. object containing dependency details
 *  2.  tasks is array of tasks,
 *  
 *  return error in string or resulted task list with executable order
 * 
 */
function stackCalculator(tempObj, tasks) {
    let main = []
    tempObjCopy = Object.assign({}, tempObj);
    for (let i = 0; i < tasks.length; i++) {
        first = tasks[i]
        let tempArr = []
        let count = 0
        let temp = ""
        
        while (tempObj[first]) {
            if (count == 0)
                tempArr.splice(0, 0, first)
            tempArr.splice(0, 0, tempObj[first])
            temp = tempObj[first]
            delete tempObj[first]
            first = temp
            count++;
        }
        if (tempObj[temp]) { }
        else if (tempObjCopy[temp]) {
            return "Error: this is a cyclic dependency"
        }
        main = main.concat(tempArr)
    }
    return main

}

/***
 *  To convert the dependency array in object format to process tha data
 *  
 *  function parameters 
 *  1 . tasks is array of tasks,
 *  2.  dependencies list
 *  3. callback function
 *  
 *  return error in string or resulted task list with executable order
 * 
 */
function dependencyConverter(dependencies, tasks, output) {
    let tempObj = {}
    let flag = true
    dependencies.forEach(element => {
        element = element.split("=>")
        if (element.length !== 2) {
            flag = false
            return output("Error : Invalid dependency format")
        }
        tempObj[element[0]] = element[1]
    });
    if (flag) {
        final = stackCalculator(tempObj, tasks)
        return output(null, final)
    }
}


/***
 * Main function to test the input scenarios and calling nested functions
 * 
 *  function parameters 
 *  1 . tasks is array of tasks,
 *  2.  dependencies list
 *  
 *  return error in string or resulted task list with executable order
 * 
 */
function screeningTask(tasks = [], dependencies = []) {

    var result = []
    if (tasks.length > 50) {
        return "Error: Tasks cannot be more than 50";
    } else if (tasks.length == 0) {
        return tasks;
    } else if (dependencies.length == 0) {
        return tasks;
    } else {
        return dependencyConverter(dependencies, tasks, (err, result) => {
            if (err) {
                return err
            } else {
                return result
            }

        })
    }
}

module.exports.screeningTask=screeningTask;
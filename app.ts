type NoteType = "noConfirm" | "confirm"

interface ToDoList {
    name:string,
    info:string,
    creation:Date,
    complete:"pending"|"complete",
    updated:Date
    type: NoteType;
}
class Obj {
    protected obj:ToDoList[]
    constructor(obj:ToDoList[]){
        this.obj = obj
    }
}

class ToDoLists extends Obj{
    name:ToDoList["name"]
    info:ToDoList["info"]
    creation:ToDoList["creation"]
    complete:ToDoList["complete"]
    updated:ToDoList["updated"] 

    getAllNotes(){
        return this.obj
    }
    getAllNotCompletedNotes(){
        let count = 0
        this.obj.forEach((el)=>{
            if (el.complete == "pending") {
                count++
            }
        })
        console.log(`You have ${this.obj} notes from which ${count} are not completed`)
    }
    SortAllNotes(filter:"creation"|"complete"){
        if(filter == "complete"){
            return this.obj.sort((a, b) => a.complete.localeCompare(b.complete));
        }
        if (filter == "creation") {
            return this.obj.sort((a, b) => a.creation.getTime() - b.creation.getTime());
        }
    }
    delete(find:string){
        for (let i = 0; i < this.obj.length; i++) {
            if (this.obj[i].name == find || this.obj[i].info == find) {
                this.obj.splice(i,1)
            }
        }
    }
    search(find:string): ToDoList | undefined{
        return this.obj.find(el => el.name === find || el.info === find)
    }
}

class Todo extends ToDoLists{   


    add(name:ToDoList["name"],info:ToDoList["info"],creation:ToDoList["creation"],complete:ToDoList["complete"],updated:ToDoList["updated"],type:ToDoList["type"] ){
        if(info && name) {
            this.obj.push({
                name:name,
                info:info,
                creation:creation,
                complete:complete,
                updated:updated,
                type:"noConfirm"
            })
        }
    }
    

    change(find:string,newData:string){
        const element = this.search(find)
            if (element && element.type == "noConfirm") {
                element.info = newData
                element.updated = new Date
            }
    }
}
class TodoEx extends ToDoLists{   

    add(name:ToDoList["name"],info:ToDoList["info"],creation:ToDoList["creation"],complete:ToDoList["complete"],updated:ToDoList["updated"],type:ToDoList["type"] ){
        if(info && name) {
            this.obj.push({
                name:name,
                info:info,
                creation:creation,
                complete:complete,
                updated:updated,
                type:"confirm"
            })
        }
    }
    change(find: string, newData: string) {
        const element = this.search(find);
        if (element && element.type == "confirm") {
            const confirmEdit = confirm('Are you sure you want to edit this item?');
            if (confirmEdit && element.type === "confirm") {
                element.info = newData;
                element.updated = new Date();
            }
        }
    }


}

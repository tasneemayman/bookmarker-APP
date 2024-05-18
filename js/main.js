var bookmarkNameElement=document.getElementById("bookmarkName");
var bookmarkURLElement=document.getElementById("bookmarkURL");
// var VisitBtn=document.querySelector("btn-visit")
var Booklist=[];
if (localStorage.getItem("bookmark")){
    Booklist=JSON.parse(localStorage.getItem("bookmark"))
    display()
}
function addBookmark(){
    if(bookmarkNameElement.value&&bookmarkURLElement.value){
        if(isUrlValid(bookmarkURLElement.value)){
            var bookmark={
                name:bookmarkNameElement.value,
                url:bookmarkURLElement.value
            }
            Booklist.push(bookmark);
            localStorage.setItem("bookmark",JSON.stringify(Booklist));
            display()
            clearform()
        }
        else{
           window.alert("Not valid")
           clearform()
        }

    }else{
        window.alert("Not valid")
        clearform()
     }
}
function isUrlValid(userInput) {
    var res = userInput.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%.\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%\+.~#?&//=]*)/g);
    if(res == null){
        return false;
    }else {return true;}
   
  }
function display(){
    var temp=""
    for (var i =1; i <Booklist.length; i++) {
        temp+=`<tr>
        <td>`+i+`</td>
        <td>`+Booklist[i].name+`</td>
        <td><button onclick="VisitWebsite(`+i+`)" class="btn btn-visit d-flex  justify-content-start m-auto">
        <div><i class="fa-solid fa-eye pe-2 icon"></i></div>
        Visit</button></td>
        <td><button onclick="removeWebsite(`+i+`)" class="btn btn-danger d-flex  justify-content-start m-auto">
        <div><i class="fa-solid fa-trash-can icon"></i></div>
        Delete</button></td>
        </tr>`
    }

    document.getElementById("myData").innerHTML=temp;
}
function removeWebsite(index){
    Booklist.splice(index,1)
    localStorage.setItem("bookmark",JSON.stringify(Booklist));
    display()

}
function VisitWebsite(index) {

    if(Booklist[index].url.startsWith("https://")){
      window.open(Booklist[index].url, "_blank")
    }else{
      var site_url="https://"+Booklist[index].url;
      window.open(site_url, "_blank")
    }
  }
function clearform() {
    bookmarkNameElement.value=" ";
    bookmarkURLElement.value=" ";

}
var del=document.getElementById('del')
var ac=document.getElementById('ac')
var ans=document.getElementById('answer')
var keys=document.getElementsByClassName('keys')
var exe=document.getElementById('exe')
var str=""

function is_operator(s){
  return ['+','-','×','/','^','(',')'].includes(s)
}
del.addEventListener('click',()=>{
  var l=ans.innerText.length
  if(['Faulty Input!','Infinity','NaN'].includes(ans.innerText)){
    ans.innerText=''
    str=''
  }
  ans.innerText=answer.innerText.slice(0,l-1)
  if(str.length!=0){
  if(is_operator(str[str.length-2])){
    str=str.slice(0,str.length-3)
  }
  else{
    str=str.slice(0,str.length-1)
  }}
})

ac.addEventListener('click',()=>{ans.innerText="";str=""})

function add_click(){
for(var i=0;i<18;i++){
  keys[i].addEventListener('click',function(){
    var x=this.innerText
    if(x=='EXP'){
      ans.innerText+='^'
      str+=' ^ '
    }
    else{
      ans.innerText+=x
      if(((x==='+')||(x==='-'))&&((str==="")||(is_operator(str[str.length-2])))) {
        str=str+' '+x
      }
      else if(is_operator(x)||(x=='EXP')){
        str=str+' '+x+' '
      }
      else{
        str+=x
      }
    }
    console.log(str)
  })
}}
add_click()
//Execution
var isp={'(':0 ,'+':1, '-':1, '×':2, '/':2, '^':3}
var icp={'(':4 ,'+':1, '-':1, '×':2, '/':2, '^':3}
function postfix(r){
    var stk=[]
    var out=[]
    var j
    for(j of r){
        if(!(is_operator(j))){
            out.push(j)
            continue}
        if(j==')'){
            while(stk[stk.length-1]!='('){
                out.push(stk.pop())}
            stk.pop()
            continue
        }
        while((stk.length!=0)&&(isp[stk[stk.length-1]]>=icp[j])){
            out.push(stk.pop())
        }
        stk.push(j)
    }
    while(stk.length!=0){
        out.push(stk.pop())
        console.log(out)
    }
    return out
}
function removeNil(out){
  j=[]
  for(i of out){
    if(i!==''){
      j.push(i)
    }
  }
  console.log(j)
  return j
}
function evaluate(a,sym,b){
    a=Number(a)
    b=Number(b)
    if(sym=='+'){
        return a+b
    }
    else if(sym=='-'){
        return a-b
    }
    else if(sym=='×'){
        return a*b
    }
    else if(sym=='/'){
        return a/b
    }
    else if(sym=='^'){
        return a**b
    }
}
function postEval(p){
  stk=[]
  var s
  for(s of p){
      if (!(is_operator(s))){
          stk.push(Number(s))
          continue
        }
      var t1=stk.pop()
      var t2=stk.pop()
      var eval=evaluate(t2,s,t1)
      console.log(eval)
      stk.push(eval)
    }
  return(stk.pop())
}
function checkOperators(l){
  var ops=0
  var oprnd=0
  var brackRight=0
  var bracLeft=0
  for(i of l){
    if(['+','-','/','^','×'].includes(i)){
    ops++
    }
    else if(i==='('){
      bracLeft++
    }
    else if(1===')'){
      brackRight++
    }
    else{
      oprnd++
    }
  }
  if(bracLeft!=brackRight){
    return false
  }
  if(ops!=oprnd-1){
    return false
  }
  return true
}
function execute(){
  var y=removeNil(postfix(str.split(' ')))
  var x=checkOperators(y)
  if(x===false){
    ans.innerText='Faulty Input!'
    str=''
  }
  else{
  var res=postEval(y)
  ans.innerText=res
  str=String(res)
  console.log(res,str)
  }
}
exe.addEventListener('click',()=>{execute()})

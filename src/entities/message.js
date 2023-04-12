export function createMessage(from, text, to="todos", type="status", time=new Date().toLocaleTimeString()){
    return { from, to, text, type, time}
}
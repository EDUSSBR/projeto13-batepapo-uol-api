export function createMessage(from, text, to="Todos", type="status", time=new Date().toLocaleTimeString("pt-BR")){
    return { from, to, text, type, time}
}
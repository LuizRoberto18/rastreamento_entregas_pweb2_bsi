export class EntregasController {
    constructor(serice) {
        this.service = this.service;
    }
      static async listarEntregas(req,res,next){
        try{
            let entregas = this.service.listarTodos()
            if(entregas.length === 0){
                return res.status(404).json({message: "Nenhuma entrega cadastrada"})
            }
            res.json(entregas)
        }catch(err){
            next(err)
        }
    }

}
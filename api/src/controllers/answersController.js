const { Answer, Question } = require('../db');
const { Op } = require("sequelize");

const createAnswer = async (req, res) => {
    try {
        // console.log(req.body) // .log('-------POST /answer -------------- ')
        const { userId, questionId, answer, rating } = req.body;

        // console.log('Posteo Answer');
        if (!answer || !userId || !questionId || !rating) {
            return res.status(401).json({
                error: "Falta algun dato, asegurese de enviar userId, questionId, answer, rating",
                data: null
            })
        }
        let newAnswer = {    // creo nuevo objetos con datos de la answer pasada x body
            userId,
            questionId,
            answer,
            rating
        }

        const qAnswer = await Answer.create(newAnswer);
        // let msg = `Se creo la respuesta ${qAnswer.id}.`
        return res.status(201).json({ error: null, data: qAnswer })

    } catch (error) {
        // console.log(error)
        return res.status(500).json({ error: 'Error en el controlador de answer', data: null })
    }
}

const getAnswer = async (req, res) => {
    const questionId = req.params.id;
    try {
        if (questionId) {
            // console.log('Respuesta params con questionId: ', questionId);
            let result = await Answer.findAll(
                {
                    where: {
                        questionId
                    },
                    include: {
                        model: Question
                    }
                }
            );
            console.log('result trae: ', result)
            if (!result[0]) {
                return res.status(500).send({ error: "No se encuentran respuestas para esta pregunta", data: null })
            }
            return res.status(200).json({ error: null, data: result })
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error en el controlador de answer al obtener las respuestas', data: null })
    }
}


const updateAnswer = async (req, res, next) => {
    try {
        const dataAnswer = req.body;
        const { id } = req.params;

        const updateAnswer = await Answer.update(dataAnswer, {
            where: {
                id
            }
        })

        updateAnswer[0] !== 0 ?
            res.json('Se edito la respuesta') :
            res.status(500).json({ error: 'No se puedo editar la respuesta', data: null })

    } catch (error) {
        // next(error)
        return res.status(500).json({ error: 'Error en el controlador de answer al actualizar la respuesta', data: null })
    }
};


module.exports = { createAnswer, updateAnswer, getAnswer }
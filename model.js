//Modelo de datos

var quizzes = [
  {
    question: "Capital de Italia",
    answer: "Roma"
  },
  {
    question: "Capital de Francia",
    answer: "París"
  },
  {
    question: "Capital de España",
    answer: "Madrid"
  },
  {
    question: "Capital de Portugal",
    answer: "Lisboa"
  }
  ];

  exports.count = () => quizzes.length;

  exports.add = (question,answer) => {
  	quizzes.push({
  		question: (question|| "").trim(),
  		answer: (answer|| "").trim()
  	});

  };

  exports.update =(id, quetion, answer) => {
  	const quiz= quizzes[id];
  	if (typeof quiz ==  "undefined") {
  		throw new Error (`El valor del parámetro id no es válido.`);
  	}
  	quizzes.slice(id,1, {
  		question: (question|| "").trim(),
  		answer: (answer|| "").trim()

  	});
  };
  //DEvuelve un objeto json con el contennido de quizzes

  exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

  exports.getByIndex = id => {
  	const quiz = quizzes[id];
  	if (typeof quiz ==  "undefined") {
  		throw new Error (`El valor del parámetro id no es válido.`);
  	}
  	return JSON.parse(JSON.stringify(quiz));
  };

  exports.deleteByIndex = id => {
  	const quiz = quizzes[id];
  	if (typeof quiz ==  "undefined") {
  		throw new Error (`El valor del parámetro id no es válido.`);
  	}
  	quizzes.slice(id,1);
  };

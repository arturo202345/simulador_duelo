const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// ---------- Banco de 82 preguntas ----------
const BANK = [
["¿Cuál de las siguientes ventajas de la biomasa está directamente ligada a la economía circular?",["Genera combustibles fósiles.","Elimina la necesidad de reciclaje.","Incrementa la deforestación controlada.","Reduce residuos orgánicos al transformarlos en energía."],3],
["¿Cuál de los siguientes efectos resume mejor los impactos sociales de la Revolución Verde?",["Descentralización tecnológica y empoderamiento campesino.","Promoción de la soberanía alimentaria.","Aumento de la resiliencia ecológica.","Dependencia de insumos externos y concentración de la producción."],3],
["¿Cuál de los siguientes escenarios representa una limitación estructural para la adopción de prácticas agroecológicas?",["Presencia de alta diversidad biológica.","Falta de infraestructura digital en zonas rurales.","Uso de abonos orgánicos locales.","Implementación de rotación de cultivos."],1],
["¿Cuál de los siguientes factores ecológicos tiene mayor influencia sobre la composición de microorganismos del suelo?",["Contenido de materia orgánica y pH.","Tipo de maquinaria empleada.","Nivel de radiación solar.","Velocidad del viento."],0],
["¿Cuál de los siguientes principios permite una transición efectiva hacia sistemas sostenibles de producción agrícola?",["Aplicar agroquímicos de manera programada para reducir la biodiversidad.","Incrementar la dependencia de insumos externos como garantía de productividad.","Integrar procesos ecológicos naturales para la regulación de plagas, reciclaje de nutrientes y conservación del suelo.","Sustituir prácticas tradicionales por monocultivos intensivos con alta mecanización."],2],
["¿Cuál es el principal riesgo de la digitalización agrícola no regulada?",["Mejora de la trazabilidad de la producción.","Fortalecimiento de la seguridad alimentaria local.","Democratización del acceso a la información.","Concentración de datos productivos en corporaciones privadas con poder de mercado."],3],
["¿Cuál es un efecto directo de la alta tensión superficial del agua en ecosistemas?",["Elimina la necesidad de transpiración en plantas.","Permite que insectos como zapateros se desplacen sobre el agua.","Reduce la solubilidad de oxígeno.","Inhibe la evaporación en ríos y lagos."],1],
["¿Qué analogía es correcta entre sistemas de software y células?",["El núcleo se asemeja a una base de datos central que gestiona instrucciones.","La membrana plasmática equivale a un lenguaje de programación.","Los lisosomas operan como firewalls en redes.","Las mitocondrias funcionan como impresoras de salida de datos."],0],
["Cuando el agua de riego presenta alta conductividad eléctrica, ¿qué indicio revela esto?",["Elevada concentración de iones disueltos que pueden afectar cultivos sensibles.","Ausencia total de sales en el agua.","Equilibrio ideal para todos los sistemas agrícolas.","Reducción inmediata de la fotosíntesis."],0],
["Cuando el uso de tecnologías digitales promueve la eficiencia energética, la trazabilidad y la sostenibilidad, se cumple el principio de:",["Dependencia tecnológica.","Gobernanza tecnológica responsable.","Expansión industrial descontrolada.","Exclusión rural."],1],
["Durante la mitosis en células animales, la citocinesis ocurre mediante un anillo contráctil de actina. ¿Qué consecuencia tendría un defecto en este anillo?",["Los lisosomas se duplicarían en exceso.","Se formaría una célula multinucleada incapaz de completar la división.","La célula perdería todos sus ribosomas.","El núcleo no replicaría su ADN."],1],
["El análisis de cadenas de valor alimentarias según Porter busca identificar:",["Eslabones sin impacto económico.","Actividades que agregan valor competitivo al producto final.","Costos externos irrelevantes.","Factores que disminuyen la productividad."],1],
["El biogás debe purificarse antes de inyectarse en la red de gas natural porque:",["No posee ningún valor energético.","Contiene CO2 y H2S que pueden corroer equipos.","Siempre se encuentra en estado sólido.","Su densidad es mayor que la del acero."],1],
["El cambio climático amenaza la seguridad alimentaria porque:",["No tiene relación con la agricultura.","Mejora el rendimiento global.","Afecta disponibilidad, acceso y estabilidad de los alimentos.","Estabiliza la producción agrícola."],2],
["El cambio climático incide sobre la producción agropecuaria al:",["Alterar temperatura, precipitación y frecuencia de eventos extremos.","Estabilizar los patrones de lluvia.","Mejorar la productividad natural del suelo.","Reducir el nivel del mar."],0],
["El concepto de resiliencia agrícola se relaciona con:",["Uso indiscriminado de pesticidas.","Dependencia de insumos externos.","Adaptabilidad del sistema frente a perturbaciones sin pérdida de funcionalidad.","Reducción de diversidad genética."],2],
["El enfoque de \"sinergia\" en agroecología se cumple cuando:",["Las especies compiten por recursos sin beneficio mutuo.","Se reduce la diversidad biológica.","La interacción entre componentes genera funciones ecológicas adicionales al rendimiento individual.","Se eliminan relaciones simbióticas."],2],
["El factor que más condiciona la distribución de cultivos en un ecosistema agrícola es:",["Fertilidad, textura y estructura del suelo.","Nivel de mecanización industrial.","Disponibilidad de maquinaria importada.","Política comercial."],0],
["El gen se define actualmente como:",["Una molécula lipídica transmisora de información.","Una secuencia exclusivamente proteica de herencia.","Una estructura siempre visible al microscopio óptico.","Una región del genoma que se transcribe y codifica para un producto funcional."],3],
["El mayor reto del aprovechamiento de biomasa en Ecuador es:",["Eliminar el uso de cualquier combustible fósil.","Garantizar que toda biomasa sea importada.","Generar electricidad sin control ambiental.","Compatibilizar la producción de biocombustibles con la demanda alimentaria."],3],
["El principio de eficiencia en agroecología busca:",["Reducir costos mediante uso intensivo de agroquímicos.","Incrementar el uso de maquinaria pesada.","Uniformar los procesos productivos.","Optimizar recursos naturales con menor impacto ambiental."],3],
["El principio de reciclaje agroecológico se aplica correctamente cuando:",["Se utilizan subproductos para reducir dependencia de insumos externos.","No se realiza compostaje ni rotación.","Los residuos vegetales se eliminan mediante quema abierta.","Se aplican fertilizantes químicos sin control."],0],
["El principio de sinergia en agroecología se expresa cuando:",["Las interacciones entre cultivos y organismos benéficos generan beneficios mayores que los obtenidos por separado.","El sistema depende exclusivamente de control químico.","Cada componente de la finca opera de forma independiente.","El rendimiento total se reduce por competencia entre especies."],0],
["El principio de valores humanos y sociales en agroecología se orienta a:",["Aumentar competencia y exclusión laboral.","Reducir participación campesina.","Promover equidad, justicia social y fortalecimiento comunitario.","Limitar acceso a la información."],2],
["El reciclaje de nutrientes en agroecología busca principalmente:",["Favorecer la exportación de materia orgánica.","Evitar la reincorporación de residuos.","Incrementar la erosión del terreno.","Mantener el equilibrio del suelo y reducir dependencia de insumos externos."],3],
["El uso de big data en Agricultura 4.0 permite a los productores:",["Reducir la calidad de la información.","Eliminar la necesidad de sensores.","Identificar tendencias y optimizar la planificación de cultivos.","Depender exclusivamente de observaciones manuales."],2],
["El uso de biomasa como fuente de energía enfrenta un dilema con la seguridad alimentaria porque:",["Anula la posibilidad de reciclaje de residuos agrícolas.","Destina cultivos básicos a la producción energética, elevando precios de alimentos.","Incrementa la fotosíntesis y reduce la productividad agrícola.","Genera únicamente biogás y no permite biocombustibles líquidos."],1],
["El uso de blockchain en el comercio de alimentos orgánicos permite:",["Eliminar la trazabilidad.","Reducir la confianza del consumidor.","Garantizar autenticidad y transparencia en el origen del producto.","Omitir auditorías de certificación."],2],
["El uso de drones en Agricultura 4.0 permite principalmente:",["Incrementar los costos de monitoreo.","Sustituir la observación del agricultor sin obtener datos precisos.","Eliminar la necesidad de sensores de suelo.","Determinar estrés hídrico y deficiencias nutricionales con alta resolución espacial."],3],
["El uso de indicadores ambientales en agroecología permite:",["Evitar análisis comparativos.","Evaluar sostenibilidad del sistema productivo.","Reducir monitoreo ecológico.","Aumentar producción sin control."],1],
["El uso de sensores de humedad vinculados al riego automático reduce:",["Desperdicio hídrico y consumo innecesario de energía.","Productividad del cultivo.","Frecuencia de monitoreo.","Eficiencia energética."],0],
["El uso de sistemas inteligentes de alimentación animal automatizados tiene como ventaja:",["Reducir el monitoreo.","Requerir más mano de obra.","Controlar dosis y horarios precisos mejorando eficiencia y bienestar.","Aumentar el desperdicio de alimento."],2],
["El uso del agua en la agricultura sostenible implica:",["Aplicar el máximo volumen posible en cada riego.","Ajustar el riego a las necesidades del cultivo y evitar pérdidas.","Priorizar el uso urbano sobre el agrícola.","Riego constante sin considerar la evaporación."],1],
["En el contexto de ingeniería de software aplicada a biología, ¿qué similitud existe entre la taxonomía biológica y la programación orientada a objetos?",["Ambas se basan en relaciones de herencia jerárquica.","La programación orientada a objetos no utiliza clasificaciones.","La taxonomía permite polimorfismo de especies.","En biología la clasificación es aleatoria, en programación es determinista."],0],
["En el metabolismo microbiano, los organismos facultativos se caracterizan porque:",["Alternan entre metabolismo aeróbico y anaeróbico según condiciones.","Son incapaces de realizar catabolismo.","Solo viven en ambientes ricos en oxígeno.","Generan exclusivamente energía luminosa."],0],
["En estudios de biodiversidad del suelo, ¿qué organismos son clave para el reciclaje de nutrientes?",["Hongos y bacterias descomponedoras.","Minerales arcillosos.","Protozoarios sin metabolismo.","Rocas ígneas."],0],
["En genética, el polimorfismo de nucleótido único (SNP) es importante porque:",["Representa cambios puntuales en el ADN que pueden influir en enfermedades.","Solo ocurre en ADN mitocondrial.","Sustituye a la meiosis como mecanismo de variación.","No afecta en nada la variabilidad entre organismos."],0],
["En la agricultura 4.0, la sinergia entre sensores, inteligencia artificial y plataformas digitales permite:",["Generar decisiones empíricas sin respaldo.","Sustituir la trazabilidad.","Desconectar la producción de la gestión.","Integrar datos en tiempo real para optimizar producción."],3],
["En la agricultura moderna, el concepto de eficiencia ecológica implica:",["Reducir el uso de recursos naturales sin comprometer la productividad.","Priorizar el beneficio económico a corto plazo.","Maximizar los rendimientos independientemente del impacto ambiental.","Aumentar el consumo energético para mecanizar la producción."],0],
["En la cadena de valor alimentaria, los proveedores de crédito y asistencia técnica son actores:",["De servicios de apoyo.","De distribución minorista.","De consumo final.","De producción directa."],0],
["En la comparación entre células vegetales y animales, ¿qué situación explica mejor una ventaja evolutiva de la vacuola central?",["Permite almacenar proteínas ribosomales para síntesis rápida.","Sustituye la función energética de las mitocondrias.","Facilita la turgencia y optimiza el uso de agua en ambientes limitados.","Evita la necesidad de cloroplastos durante la fotosíntesis."],2],
["En la replicación de ADN, la complementariedad A-T y G-C asegura que:",["La información genética pueda copiarse con fidelidad.","No exista mutación alguna.","El ARN pueda replicarse sin enzimas.","La doble hélice sea idéntica en procariotas y virus."],0],
["En las células vegetales, los plasmodesmatas cumplen un rol comparable a:",["Tarjetas gráficas, porque procesan señales lumínicas.","Routers en redes informáticas, al permitir comunicación entre nodos.","Discos duros, porque almacenan proteínas de reserva.","Cortafuegos, porque bloquean moléculas dañinas."],1],
["En los sistemas agroecológicos sostenibles, la resiliencia está determinada por:",["Uniformidad genética del cultivo.","Capacidad de adaptarse y recuperarse frente a perturbaciones naturales o antrópicas.","Nivel de mecanización.","Alta dependencia de insumos externos."],1],
["En sistemas biológicos, la eficiencia de un cultivo depende directamente de:",["La presencia de ribosomas gigantes.","La relación entre tasa de crecimiento celular y limitaciones de nutrientes.","El color de la membrana plasmática.","La eliminación total del oxígeno disuelto."],1],
["En un biorreactor anaerobio para producir biogás, la acumulación de sulfuro de hidrógeno (H2S) compromete la eficiencia. ¿Qué estrategia de control es más efectiva?",["Regular el pH y adicionar filtros químicos para H2S.","Incrementar la presión de operación por encima de 3 atmósferas.","Sustituir bacterias metanogénicas por bacterias aeróbicas.","Aumentar el flujo de oxígeno en el reactor."],0],
["En un cultivo celular, la ausencia de lisosomas funcionales generaría:",["Incremento en la síntesis de proteínas de membrana.","Producción excesiva de clorofila.","Acumulación de desechos intracelulares no degradados.","Mayor eficiencia en la división celular."],2],
["En un modelo computacional de biorreactores, ¿qué variable es análoga a la tasa de refresco en bases de datos?",["La velocidad de agitación que homogeniza nutrientes.","El color del acero inoxidable en el reactor.","El peso molecular del metano generado.","El tamaño físico de la membrana celular."],0],
["En un proceso de PCR, si se eleva demasiado la temperatura de hibridación (annealing), ¿qué efecto es más probable?",["Se generará un exceso de ADN recombinante.","Las cadenas de ADN se unirán indiscriminadamente.","No se producirá la unión específica de primers y la amplificación será ineficiente.","La Taq polimerasa se inhibirá por exceso de iones magnesio."],2],
["En un sistema de riego eficiente, ¿qué innovación tecnológica es más útil?",["Reducir el pH del suelo sin monitoreo.","Incrementar la salinidad del agua.","Eliminar la fertilización por completo.","Sensores de humedad y control de caudal en tiempo real."],3],
["En un suelo con poros muy grandes, ¿qué ocurre con el agua de riego?",["Se escurre rápidamente sin ser aprovechada por las raíces.","Permanece en equilibrio óptimo sin pérdidas.","Se retiene en exceso, generando anoxia radicular.","Se convierte en agua dura por precipitación mineral."],0],
["En una crisis económica, la seguridad alimentaria se ve afectada principalmente por:",["Incremento de la diversidad de cultivos.","Aumento del poder adquisitivo.","Mejor distribución de ingresos.","Reducción del acceso económico de la población."],3],
["La Agricultura 4.0 contribuye al desarrollo sostenible al:",["Optimizar recursos, reducir pérdidas y mejorar la toma de decisiones.","Desvincular producción y sostenibilidad.","Incrementar el uso de energía fósil.","Excluir pequeños agricultores del sistema digital."],0],
["La agricultura de precisión contribuye a la mitigación del cambio climático porque:",["Reduce insumos y emisiones mediante manejo racional de recursos.","Incrementa consumo energético.","Sustituye la planificación por intuición.","Promueve labranza intensiva."],0],
["La agricultura ecológica moderna se diferencia de la tradicional porque:",["Rechaza toda innovación.","Se basa únicamente en empirismo.","Depende del uso masivo de agroquímicos.","Integra conocimiento científico y conserva prácticas sostenibles."],3],
["La agroecología busca principalmente:",["Reducir la diversidad biológica de los sistemas agrícolas.","Homogeneizar los cultivos en grandes extensiones.","Integrar principios ecológicos a los sistemas productivos.","Aumentar la dependencia tecnológica del agricultor."],2],
["La agroecología considera al suelo como un sistema vivo porque:",["Alberga interacciones biológicas esenciales para el reciclaje de nutrientes y productividad.","No requiere microorganismos.","Está compuesto únicamente de partículas minerales.","Permite monocultivos prolongados sin pérdida de fertilidad."],0],
["La aplicación de inteligencia artificial en Agricultura 4.0 permite:",["Aumentar el error en la toma de decisiones.","Predecir enfermedades y optimizar decisiones agronómicas basadas en datos masivos.","Sustituir al agricultor sin control.","Evitar la automatización de procesos."],1],
["La clasificación operativa de un biorreactor en continuo implica que:",["Se alimenta constantemente y se retira producto simultáneamente.","Se inocula una sola vez y se espera hasta finalizar el proceso.","No requiere control de parámetros ambientales.","El cultivo se limita a condiciones exclusivamente anaeróbicas."],0],
["La combinación de SIG, IoT y blockchain en cadenas agroalimentarias garantiza:",["Alta trazabilidad, monitoreo continuo y confianza en el origen de los alimentos.","Desconexión entre actores.","Dependencia de observaciones subjetivas.","Pérdida de control informático."],0],
["La crítica ecológica más fuerte a la Revolución Verde se basa en que:",["Promovió la conservación de suelos agrícolas.","Homogeneizó el paisaje agrícola y degradó la biota del suelo.","Incrementó la diversidad genética de las especies.","Redujo el uso de plaguicidas."],1],
["La diferencia clave entre respiración celular y fotosíntesis es que:",["La respiración no genera ATP.","La fotosíntesis ocurre solo en animales.","La respiración consume oxígeno y la fotosíntesis libera oxígeno.","Ambas producen oxígeno en condiciones aeróbicas."],2],
["La diversidad en los agroecosistemas mejora su estabilidad porque:",["Disminuye la competencia biológica.","Impide la especialización de especies vegetales.","Elimina la variabilidad genética.","Favorece interacciones tróficas que regulan naturalmente plagas y enfermedades."],3],
["La eficiencia del sistema de riego en Agricultura 4.0 depende de:",["Reducción del monitoreo.","Programación temporal fija.","Control automatizado con retroalimentación constante de sensores.","Aplicación uniforme sin calibración."],2],
["La eficiencia en la agricultura de precisión se basa en:",["Incremento del uso de agroquímicos en todo el lote.","Reducción del uso de insumos mediante monitoreo constante y aplicación diferenciada.","Sustitución de prácticas agronómicas por automatización total.","Homogeneización de dosis sin diagnóstico previo."],1],
["La gobernanza responsable en la cadena alimentaria promueve:",["Sustitución de controles públicos por privados.","Reducción de la fiscalización ambiental.","Transparencia, participación y rendición de cuentas en las decisiones productivas.","Concentración de poder."],2],
["La implementación de sensores IoT en el manejo del riego tiene como propósito:",["Mantener constante la frecuencia de riego sin ajustes.","Aplicar agua en momentos aleatorios.","Sustituir el análisis agronómico por algoritmos sin calibración.","Automatizar decisiones basadas en humedad real del suelo y necesidades del cultivo."],3],
["La irrigación agrícola intensiva con aguas duras suele dejar depósitos minerales en el suelo. ¿Qué impacto genera esto en la absorción de nutrientes?",["Incrementa la retención de agua por aumento de la porosidad.","No afecta en absoluto la fertilidad del suelo.","Reduce la disponibilidad de micronutrientes esenciales como hierro y zinc.","Favorece la disponibilidad de fósforo soluble."],2],
["La seguridad alimentaria incluye como dimensión fundamental:",["Incremento del PIB agroindustrial.","Exportación de productos agrícolas.","Acceso físico y económico a alimentos inocuos y nutritivos.","Reducción de impuestos sobre agroquímicos."],2],
["Las cadenas de valor alimentarias sostenibles priorizan:",["Integración de prácticas responsables desde la producción hasta el consumo.","Maximización de exportaciones a cualquier costo.","Eliminación de la participación social.","Generación de rentabilidad sin control ambiental."],0],
["Los factores ecológicos que determinan la productividad agropecuaria incluyen:",["Estrategias de marketing del producto.","Textura, estructura, fertilidad del suelo y régimen hídrico.","Factores políticos y tributarios.","Tamaño de la población urbana."],1],
["Los principios de agroecología promueven:",["Diversificación, reciclaje de nutrientes y eficiencia energética.","Uso intensivo de insumos sintéticos.","Reducción de la biodiversidad.","Deforestación progresiva."],0],
["Los sistemas pecuarios inteligentes aplican IoT para:",["Reducir la productividad.","Incrementar el confinamiento animal.","Controlar temperatura, alimentación y salud del rebaño en tiempo real.","Eliminar la supervisión veterinaria."],2],
["Un ejemplo de economía circular dentro de un sistema agropecuario es:",["Incinerar los residuos sin recuperación energética.","Reincorporar subproductos agrícolas al suelo como fuente de nutrientes orgánicos.","Exportar todos los residuos agrícolas para reducir carga local.","Comprar fertilizantes importados para compensar pérdidas."],1],
["Un país con alta producción agrícola pero bajo poder adquisitivo de la población enfrenta inseguridad alimentaria por falta de:",["Estabilidad.","Utilización.","Disponibilidad.","Acceso."],3],
["Un principio fundamental de la agroecología es:",["Usar los recursos naturales de manera sostenible y cíclica.","Sustituir recursos renovables por químicos industriales.","Priorizar la rentabilidad sobre la conservación del suelo.","Incrementar el uso de fertilizantes sintéticos."],0],
["Un sistema que mantiene disponibilidad y acceso pero falla en inocuidad alimentaria afecta el componente de:",["Acceso.","Utilización.","Disponibilidad.","Estabilidad."],1]
];

const QUESTIONS_PER_PLAYER = 5;
const TOTAL_QUESTIONS = QUESTIONS_PER_PLAYER * 2;
const NEXT_DELAY_MS = 3200; // tiempo para mostrar feedback antes de pasar de turno
const TURN_TIME_MS = 20000; // tiempo limite por pregunta (ronda normal)

// Desempate: rondas mas cortas y con menos tiempo, se repiten hasta que haya ganador
const TIEBREAK_QUESTIONS_PER_PLAYER = 2;
const TIEBREAK_TOTAL_QUESTIONS = TIEBREAK_QUESTIONS_PER_PLAYER * 2;
const TIEBREAK_TIME_STEP_MS = 3000; // cuanto se reduce el tiempo por cada ronda extra
const TIEBREAK_MIN_TIME_MS = 6000; // piso minimo de tiempo por pregunta

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestionSet(count) {
  const chosen = shuffle(BANK).slice(0, count);
  return chosen.map(([q, opts, correctIdx]) => {
    const correctText = opts[correctIdx];
    const order = shuffle(opts.map((_, i) => i));
    const newOpts = order.map((i) => opts[i]);
    return { q, options: newOpts, correct: newOpts.indexOf(correctText) };
  });
}

function buildTurnOrder(total, startPlayer) {
  return Array.from({ length: total }, (_, i) => (i + startPlayer) % 2);
}

function genCode() {
  let code;
  do {
    code = String(Math.floor(1000 + Math.random() * 9000));
  } while (rooms[code]);
  return code;
}

// rooms[code] = { players: [{id,name,score,connected}], questions, turnOrder, currentIndex, timer, status }
const rooms = {};

function publicState(room) {
  const idx = room.currentIndex;
  const total = room.totalQuestions;
  const turnPlayer = idx < total ? room.turnOrder[idx] : null;
  return {
    players: room.players.map((p) => ({ name: p.name, score: p.score, connected: p.connected })),
    currentIndex: idx,
    total,
    turnPlayer,
    question: idx < total ? { q: room.questions[idx].q, options: room.questions[idx].options } : null,
    status: room.status,
    turnTimeMs: room.turnTimeMs,
    tiebreakRound: room.tiebreakRound || 0,
  };
}

function startTurnTimer(code) {
  const room = rooms[code];
  if (!room) return;
  clearTimeout(room.timer);
  room.timer = setTimeout(() => {
    // se acabo el tiempo -> se cuenta como incorrecta, avanza automaticamente
    handleAnswer(code, room.turnOrder[room.currentIndex], -1, true);
  }, room.turnTimeMs);
}

function handleAnswer(code, playerIndex, optionIndex, timedOut) {
  const room = rooms[code];
  if (!room || room.status !== 'playing') return;
  const idx = room.currentIndex;
  const total = room.totalQuestions;
  if (idx >= total) return;
  if (room.turnOrder[idx] !== playerIndex) return; // no es su turno

  clearTimeout(room.timer);
  const q = room.questions[idx];
  const isCorrect = optionIndex === q.correct;
  if (isCorrect) room.players[playerIndex].score += 1;

  io.to(code).emit('answer_result', {
    playerIndex,
    optionIndex,
    correctIndex: q.correct,
    isCorrect,
    timedOut: !!timedOut,
    scores: room.players.map((p) => p.score),
  });

  room.currentIndex += 1;

  setTimeout(() => {
    if (room.currentIndex >= total) {
      const [s0, s1] = room.players.map((p) => p.score);
      if (s0 === s1) {
        // Empate -> ronda de desempate: menos preguntas y menos tiempo, reinicia marcador
        room.tiebreakRound = (room.tiebreakRound || 0) + 1;
        room.turnTimeMs = Math.max(TIEBREAK_MIN_TIME_MS, (room.turnTimeMs || TURN_TIME_MS) - TIEBREAK_TIME_STEP_MS);
        room.players.forEach((p) => (p.score = 0));
        room.totalQuestions = TIEBREAK_TOTAL_QUESTIONS;
        room.questions = buildQuestionSet(TIEBREAK_TOTAL_QUESTIONS);
        // el jugador que no empezo la ronda anterior arranca esta, para que sea justo
        const startPlayer = room.tiebreakRound % 2;
        room.turnOrder = buildTurnOrder(TIEBREAK_TOTAL_QUESTIONS, startPlayer);
        room.currentIndex = 0;
        room.status = 'playing';
        io.to(code).emit('tiebreak_start', publicState(room));
        startTurnTimer(code);
      } else {
        room.status = 'finished';
        io.to(code).emit('game_over', {
          scores: room.players.map((p) => p.score),
          players: room.players.map((p) => p.name),
          tiebreakRound: room.tiebreakRound || 0,
        });
      }
    } else {
      io.to(code).emit('question_update', publicState(room));
      startTurnTimer(code);
    }
  }, NEXT_DELAY_MS);
}

io.on('connection', (socket) => {
  socket.on('create_room', ({ name }) => {
    const code = genCode();
    rooms[code] = {
      players: [{ id: socket.id, name: (name || 'Jugador 1').slice(0, 20), score: 0, connected: true }],
      questions: [],
      turnOrder: [],
      currentIndex: 0,
      totalQuestions: TOTAL_QUESTIONS,
      turnTimeMs: TURN_TIME_MS,
      tiebreakRound: 0,
      status: 'waiting',
      timer: null,
    };
    socket.join(code);
    socket.data.code = code;
    socket.data.playerIndex = 0;
    socket.emit('room_created', { code });
  });

  socket.on('join_room', ({ code, name }) => {
    const room = rooms[code];
    if (!room) return socket.emit('join_error', { message: 'Código no encontrado.' });
    if (room.players.length >= 2) return socket.emit('join_error', { message: 'La sala ya está llena.' });

    room.players.push({ id: socket.id, name: (name || 'Jugador 2').slice(0, 20), score: 0, connected: true });
    socket.join(code);
    socket.data.code = code;
    socket.data.playerIndex = 1;

    room.questions = buildQuestionSet(TOTAL_QUESTIONS);
    room.turnOrder = buildTurnOrder(TOTAL_QUESTIONS, 0);
    room.totalQuestions = TOTAL_QUESTIONS;
    room.turnTimeMs = TURN_TIME_MS;
    room.tiebreakRound = 0;
    room.currentIndex = 0;
    room.status = 'playing';

    io.to(code).emit('game_start', publicState(room));
    startTurnTimer(code);
  });

  socket.on('submit_answer', ({ optionIndex }) => {
    const code = socket.data.code;
    const playerIndex = socket.data.playerIndex;
    if (code === undefined || playerIndex === undefined) return;
    handleAnswer(code, playerIndex, optionIndex, false);
  });

  socket.on('rematch', () => {
    const code = socket.data.code;
    const room = rooms[code];
    if (!room || room.players.length < 2) return;
    room.players.forEach((p) => (p.score = 0));
    room.questions = buildQuestionSet(TOTAL_QUESTIONS);
    room.turnOrder = buildTurnOrder(TOTAL_QUESTIONS, 0);
    room.totalQuestions = TOTAL_QUESTIONS;
    room.turnTimeMs = TURN_TIME_MS;
    room.tiebreakRound = 0;
    room.currentIndex = 0;
    room.status = 'playing';
    io.to(code).emit('game_start', publicState(room));
    startTurnTimer(code);
  });

  socket.on('disconnect', () => {
    const code = socket.data.code;
    const room = rooms[code];
    if (!room) return;
    const p = room.players.find((pl) => pl.id === socket.id);
    if (p) p.connected = false;
    io.to(code).emit('opponent_left');
    clearTimeout(room.timer);
    setTimeout(() => {
      if (room.players.every((pl) => !pl.connected)) delete rooms[code];
    }, 60000);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Duelo Agro corriendo en puerto ${PORT}`));

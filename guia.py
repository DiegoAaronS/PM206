from flask import Flask, render_template_string

app = Flask(__name__)

HTML = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Survival Guide - Programacion Movil</title>
    <style>
        * { box-sizing: border-box; }
        body {
            background: linear-gradient(145deg, #0b1a2e 0%, #0a121f 100%);
            font-family: 'Segoe UI', system-ui;
            color: #eef4ff;
            padding: 2rem 1rem;
        }
        .contenedor { max-width: 1200px; margin: 0 auto; }
        .hero-aventura {
            background: rgba(10, 25, 47, 0.7);
            backdrop-filter: blur(12px);
            border-radius: 2rem;
            padding: 1.5rem 2rem;
            margin-bottom: 2rem;
            border: 1px solid rgba(0, 255, 255, 0.3);
        }
        .titulo-aventura {
            font-size: 2.5rem;
            font-weight: 800;
            background: linear-gradient(135deg, #AAFFE9, #5F9DFF);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
        }
        .zonas-grid { display: flex; flex-direction: column; gap: 2rem; }
        .zona-card {
            background: rgba(15, 30, 55, 0.85);
            backdrop-filter: blur(8px);
            border-radius: 1.8rem;
            border: 1px solid rgba(72, 187, 255, 0.3);
            overflow: hidden;
        }
        .zona-header {
            background: #0f212e;
            padding: 1.2rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
        }
        .zona-titulo { font-size: 1.6rem; font-weight: 700; }
        .estado-bloqueo {
            background: #ff4d4d20;
            padding: 0.3rem 0.8rem;
            border-radius: 40px;
            font-size: 0.8rem;
        }
        .zona-contenido { padding: 1.8rem 2rem; border-top: 1px solid #2d4f6e; }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-bottom: 2rem;
        }
        .info-card {
            background: #071826;
            padding: 1rem;
            border-radius: 1.2rem;
            border-left: 4px solid #2dd4bf;
        }
        .list {
            margin: 0.5rem 0 0 1.2rem;
            padding-left: 0;
        }
        .list li {
            margin-bottom: 0.3rem;
        }
        .tag {
            display: inline-block;
            background: #2dd4bf20;
            padding: 0.2rem 0.8rem;
            border-radius: 2rem;
            font-size: 0.8rem;
        }
        .cols {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
        }
        .col {
            flex: 1;
            min-width: 240px;
        }
        .tbl {
            width: 100%;
            border-collapse: collapse;
            background: #0a1a2a;
            border-radius: 1rem;
            overflow: hidden;
        }
        .tbl th, .tbl td {
            padding: 0.6rem;
            text-align: center;
            border-bottom: 1px solid #2d4f6e;
        }
        .tbl th {
            background: #0f2e42;
            font-weight: bold;
        }
        .preguntas-area {
            margin-top: 1.8rem;
            background: #05161f;
            border-radius: 1.2rem;
            padding: 1.2rem;
        }
        .pregunta { margin-bottom: 1rem; padding: 0.8rem; background: #0f2a38; border-radius: 1rem; }
        .opciones { display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 0.5rem; }
        .opcion {
            background: #1f3e4c;
            padding: 0.4rem 1rem;
            border-radius: 2rem;
            cursor: pointer;
            transition: 0.1s;
        }
        .opcion:hover { background: #2f5e72; }
        .opcion.seleccionada { background: #2dd4bf; color: #000; font-weight: bold; }
        .compromiso {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin: 1rem 0;
            padding: 0.5rem;
            background: #0b2b2f;
            border-radius: 2rem;
        }
        .check-compromiso { width: 20px; height: 20px; cursor: pointer; }
        .mensaje-exito { color: #7ae9c8; font-weight: bold; }
        .note {
            background: #0f212e;
            padding: 0.6rem;
            border-radius: 1rem;
            margin-top: 1rem;
            font-size: 0.9rem;
        }
    </style>
</head>
<body>
<div class="contenedor">
    <div class="hero-aventura">
        <div class="titulo-aventura">Survival Guide: El Reto Movil</div>
        <div style="margin-top: 0.5rem;">Aventura de texto - Responde 2 preguntas y marca el compromiso para desbloquear</div>
    </div>

    <div class="zonas-grid" id="zonasContainer">

        <div class="zona-card" id="zona0">
            <div class="zona-header">
                <div><span style="font-size:1.8rem; margin-right:0.5rem;">1</span><span class="zona-titulo">La Camara de las Reglas</span></div>
                <div class="estado-bloqueo" id="estado0">Activo</div>
            </div>
            <div class="zona-contenido" id="contenido0">
                <div style="margin-bottom: 1rem;">
                    <div class="tag">Reglas</div>
                </div>
                <div class="cols">
                    <div class="col">
                        <h3>Lineamientos</h3>
                        <ol class="list">
                            <li>Respeto.</li>
                            <li>Participación activa en orden.</li>
                            <li>No entregar trabajos incompletos.</li>
                            <li>No se aplican exámenes fuera de tiempo.</li>
                            <li>Plagio de trabajos = <b>0 para todos</b>.</li>
                            <li>3 faltas = final de parcial.</li>
                            <li>Calificación máxima en final: <b>8</b>.</li>
                        </ol>
                        <h3>Evidencia de desempeño (criterios)</h3>
                        <ul class="list">
                            <li>Participación activa en clase.</li>
                            <li>Trabajos en Classroom.</li>
                            <li>Entregas completas.</li>
                            <li>Respetar tiempos de entrega.</li>
                            <li>Presentación con calidad universitaria.</li>
                        </ul>
                    </div>
                    <div class="col">
                        <h3>Classroom</h3>
                        <ul class="list">
                            <li>Entregar los trabajos para su revisión.</li>
                            <li>Entregas en <b>PDF</b>.</li>
                            <li>Avisos de clase.</li>
                            <li>Entregas autorizadas con retraso: <b>máx. 5</b> de calificación.</li>
                        </ul>
                        <h3>Formato de entregas</h3>
                        <ul class="list">
                            <li>Portada: diseño libre, logo UPQ, tema, datos del alumno y materia.</li>
                            <li>Conclusión de aprendizaje: descripción de lo aprendido durante el desarrollo de la actividad.</li>
                        </ul>
                    </div>
                </div>
                <div class="note"><b>Obligatorio:</b> Enlace de repositorio en cada práctica, no enlace = 0</div>

                <div class="preguntas-area" id="preguntas0">
                    <div class="pregunta">
                        <div>¿Cuantas faltas causan la perdida del parcial?</div>
                        <div class="opciones" data-pregunta="r0q0">
                            <div class="opcion" data-valor="2">2 faltas</div>
                            <div class="opcion" data-valor="3">3 faltas</div>
                            <div class="opcion" data-valor="5">5 faltas</div>
                        </div>
                    </div>
                    <div class="pregunta">
                        <div>¿Que pasa si hay plagio en un trabajo?</div>
                        <div class="opciones" data-pregunta="r0q1">
                            <div class="opcion" data-valor="0">Se baja un punto</div>
                            <div class="opcion" data-valor="1">Solo el autor tiene 0</div>
                            <div class="opcion" data-valor="2">0 para todos los involucrados</div>
                        </div>
                    </div>
                </div>
                <div class="compromiso" id="compromiso0">
                    <input type="checkbox" class="check-compromiso" id="check0" disabled>
                    <label for="check0">Acepto y comprendo todas las reglas</label>
                </div>
                <div id="feedback0" style="font-size:0.9rem;"></div>
            </div>
        </div>

        <div class="zona-card" id="zona1">
            <div class="zona-header">
                <div><span style="font-size:1.8rem;">2</span><span class="zona-titulo"> El Oraculo de las Notas</span></div>
                <div class="estado-bloqueo" id="estado1">Bloqueado</div>
            </div>
            <div class="zona-contenido" id="contenido1" style="display:none;">
                <div class="tag">Porcentajes de evaluacion</div>
                <table class="tbl" style="margin: 1rem 0;">
                    <thead>
                        <tr><th></th><th>1P</th><th>2P</th><th>3P</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>EVIDENCIA DE CONOCIMIENTO</td><td>40%</td><td>40%</td><td>10%</td></tr>
                        <tr><td>EVIDENCIA DE DESEMPEÑO</td><td>20%</td><td>20%</td><td>10%</td></tr>
                        <tr><td>EVIDENCIA DE PRODUCTO</td><td>30%</td><td>30%</td><td>30%</td></tr>
                        <tr><td>PROYECTO INTEGRADOR</td><td>10%</td><td>10%</td><td>50%</td></tr>
                    </tbody>
                </table>

                <div class="preguntas-area">
                    <div class="pregunta">
                        <div>¿Que porcentaje tienen las practicas en el primer parcial? (Evidencia de producto)</div>
                        <div class="opciones" data-pregunta="r1q0">
                            <div class="opcion" data-valor="30">30%</div>
                            <div class="opcion" data-valor="40">40%</div>
                            <div class="opcion" data-valor="20">20%</div>
                        </div>
                    </div>
                    <div class="pregunta">
                        <div>Maxima calificacion si entrego con retraso</div>
                        <div class="opciones" data-pregunta="r1q1">
                            <div class="opcion" data-valor="6">6</div>
                            <div class="opcion" data-valor="5">5</div>
                            <div class="opcion" data-valor="8">8</div>
                        </div>
                    </div>
                </div>
                <div class="compromiso">
                    <input type="checkbox" class="check-compromiso" id="check1" disabled>
                    <label for="check1">Acepto el esquema de evaluacion</label>
                </div>
                <div id="feedback1"></div>
            </div>
        </div>

        <div class="zona-card" id="zona2">
            <div class="zona-header">
                <div><span style="font-size:1.8rem;">3</span><span class="zona-titulo"> Skills a desbloquear</span></div>
                <div class="estado-bloqueo" id="estado2">Bloqueado</div>
            </div>
            <div class="zona-contenido" id="contenido2" style="display:none;">
                <div class="info-grid">
                    <div class="info-card"><strong>Objetivo General</strong><br>App ↔ Internet ↔ API ↔ Servidor ↔ BD</div>
                    <div class="info-card"><strong>Objetivos Especificos</strong><br>JavaScript<br>React Native: Componentes, Screens, Navegacion, API</div>
                </div>
                <div class="preguntas-area">
                    <div class="pregunta">
                        <div>Tecnologia principal para frontend movil</div>
                        <div class="opciones" data-pregunta="r2q0">
                            <div class="opcion" data-valor="flutter">Flutter</div>
                            <div class="opcion" data-valor="react_native">React Native</div>
                            <div class="opcion" data-valor="swift">Swift</div>
                        </div>
                    </div>
                    <div class="pregunta">
                        <div>¿Que permite comunicarse con servicios web?</div>
                        <div class="opciones" data-pregunta="r2q1">
                            <div class="opcion" data-valor="storage">Almacenamiento local</div>
                            <div class="opcion" data-valor="api">Comunicacion con API</div>
                            <div class="opcion" data-valor="animations">Animaciones</div>
                        </div>
                    </div>
                </div>
                <div class="compromiso">
                    <input type="checkbox" class="check-compromiso" id="check2" disabled>
                    <label for="check2">Me comprometo a dominar estas habilidades</label>
                </div>
                <div id="feedback2"></div>
            </div>
        </div>

        <div class="zona-card" id="zona3">
            <div class="zona-header">
                <div><span style="font-size:1.8rem;">4</span><span class="zona-titulo"> La Linea del Tiempo</span></div>
                <div class="estado-bloqueo" id="estado3">Bloqueado</div>
            </div>
            <div class="zona-contenido" id="contenido3" style="display:none;">
                <div class="info-grid">
                    <div class="info-card"><strong>Fechas Clave</strong><br>Examen 1: 02-06-26<br>Examen 2: 07-07-26<br>Examen 3: 11-08-26<br>Final: 17-08-26</div>
                </div>
                <div class="preguntas-area">
                    <div class="pregunta">
                        <div>Fecha del segundo examen parcial</div>
                        <div class="opciones" data-pregunta="r3q0">
                            <div class="opcion" data-valor="020626">02-06-26</div>
                            <div class="opcion" data-valor="070726">07-07-26</div>
                            <div class="opcion" data-valor="110826">11-08-26</div>
                        </div>
                    </div>
                    <div class="pregunta">
                        <div>¿Cuando es el examen final?</div>
                        <div class="opciones" data-pregunta="r3q1">
                            <div class="opcion" data-valor="170826">17-08-26</div>
                            <div class="opcion" data-valor="110826">11-08-26</div>
                            <div class="opcion" data-valor="070726">07-07-26</div>
                        </div>
                    </div>
                </div>
                <div class="compromiso">
                    <input type="checkbox" class="check-compromiso" id="check3" disabled>
                    <label for="check3">Respetare las fechas</label>
                </div>
                <div id="feedback3"></div>
            </div>
        </div>
    </div>
</div>

<script>
    const zonas = [
        {
            correctas: { r0q0: "3", r0q1: "2" },
            actuales: { r0q0: null, r0q1: null },
            checkMarcado: false,
            completada: false
        },
        {
            correctas: { r1q0: "30", r1q1: "5" },
            actuales: { r1q0: null, r1q1: null },
            checkMarcado: false,
            completada: false
        },
        {
            correctas: { r2q0: "react_native", r2q1: "api" },
            actuales: { r2q0: null, r2q1: null },
            checkMarcado: false,
            completada: false
        },
        {
            correctas: { r3q0: "070726", r3q1: "170826" },
            actuales: { r3q0: null, r3q1: null },
            checkMarcado: false,
            completada: false
        }
    ];

    function actualizarZona(i) {
        const zona = zonas[i];
        const r0 = zona.actuales['r'+i+'q0'];
        const r1 = zona.actuales['r'+i+'q1'];
        const ambasCorrectas = (r0 === zona.correctas['r'+i+'q0'] && r1 === zona.correctas['r'+i+'q1']);

        const checkInput = document.getElementById('check'+i);
        if (ambasCorrectas) {
            checkInput.disabled = false;
        } else {
            checkInput.disabled = true;
            checkInput.checked = false;
            zona.checkMarcado = false;
        }

        const completada = ambasCorrectas && zona.checkMarcado;
        zona.completada = completada;

        const feedbackDiv = document.getElementById('feedback'+i);
        if (completada) {
            feedbackDiv.innerHTML = '<span class="mensaje-exito">Zona superada. Siguiente desbloqueada.</span>';
        } else if (ambasCorrectas && !zona.checkMarcado) {
            feedbackDiv.innerHTML = 'Respuestas correctas. Marca el Check de Compromiso.';
        } else if (!ambasCorrectas) {
            feedbackDiv.innerHTML = 'Responde correctamente las 2 preguntas.';
        } else {
            feedbackDiv.innerHTML = '';
        }

        if (completada && i+1 < zonas.length) {
            desbloquearZona(i+1);
        } else if (!completada && i+1 < zonas.length) {
            for (let j = i+1; j < zonas.length; j++) {
                bloquearZona(j);
            }
        }
    }

    function desbloquearZona(idx) {
        const estadoSpan = document.getElementById('estado'+idx);
        const contenidoDiv = document.getElementById('contenido'+idx);
        if (estadoSpan) {
            estadoSpan.innerHTML = 'Desbloqueado';
            contenidoDiv.style.display = 'block';
        }
    }

    function bloquearZona(idx) {
        const estadoSpan = document.getElementById('estado'+idx);
        const contenidoDiv = document.getElementById('contenido'+idx);
        if (estadoSpan) {
            estadoSpan.innerHTML = 'Bloqueado';
            contenidoDiv.style.display = 'none';
        }
        zonas[idx].completada = false;
        zonas[idx].checkMarcado = false;
        const check = document.getElementById('check'+idx);
        if (check) { check.checked = false; check.disabled = true; }
        const opcionesSeleccionadas = document.querySelectorAll('#zona'+idx+' .opcion.seleccionada');
        opcionesSeleccionadas.forEach(op => op.classList.remove('seleccionada'));
        zonas[idx].actuales = { ['r'+idx+'q0']: null, ['r'+idx+'q1']: null };
    }

    function inicializar() {
        for (let i = 0; i <= 3; i++) {
            const opcionesDivs = document.querySelectorAll('#zona'+i+' .opciones');
            opcionesDivs.forEach(div => {
                const opciones = div.querySelectorAll('.opcion');
                opciones.forEach(op => {
                    op.addEventListener('click', (e) => {
                        const preguntaKey = div.getAttribute('data-pregunta');
                        const valor = op.getAttribute('data-valor');
                        div.querySelectorAll('.opcion').forEach(opt => opt.classList.remove('seleccionada'));
                        op.classList.add('seleccionada');
                        zonas[i].actuales[preguntaKey] = valor;
                        actualizarZona(i);
                    });
                });
            });
            const check = document.getElementById('check'+i);
            if (check) {
                check.addEventListener('change', (e) => {
                    if (!check.disabled) {
                        zonas[i].checkMarcado = e.target.checked;
                        actualizarZona(i);
                    } else {
                        e.target.checked = false;
                    }
                });
            }
        }
        for (let j = 1; j <= 3; j++) bloquearZona(j);
    }

    inicializar();
</script>
</body>
</html>
"""

@app.route('/')
def index():
    return render_template_string(HTML)

if __name__ == '__main__':
    app.run(debug=True)
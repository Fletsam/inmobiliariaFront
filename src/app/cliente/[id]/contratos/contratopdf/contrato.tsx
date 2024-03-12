"use client"

import { Document, Font, Image, Page, StyleSheet, Text } from "@react-pdf/renderer";

import moment from "moment";
import 'moment/locale/es';

moment.locale("es")
let numeral = require('numeral');
export const ContratoPDF = ({cliente,contrato,lote}) => (
	
  <Document>
    <Page style={styles.body} >
      
      <Text style={styles.title}>Tu Hogar Inmobiliaria</Text>
      
      <Text style={styles.subtitle}>
        CONTRATO CIVIL DE PRESTACION DE SERVICIOS PROFESIONALES  
      </Text>
      <Text style={styles.subtitle}>
        PROPIEDAD 
      </Text>
      <Text style={styles.text}>
        Que celebran por una parte C.P. {cliente.nombre} quien para los efectos del presente contrato se le denominará “EL CLIENTE”, 
		y por la otra parte la empresa denominada TU HOGAR INMOBILIARIA, 
		representada en este acto por el L.A. MIGUEL ÁNGEL RODRÍGUEZ TORRES, 
		representante legal y propietario de esta, quien a su vez se le denominará para efectos del presente contrato “LA INMOBILIARIA”, 
		al tenor de las siguientes:.
      </Text>
	  <Text style={styles.title}>
		DECLARACIONES
	  </Text>
		<Text style={styles.subtitle}>
		I.-	DECLARA EL CLIENTE:

		</Text>
		<Text style={styles.text}>

	 	a) C.P. {cliente.nombre} declara ser , 
		mayor de edad, de estado civil ,
		 de ocupación  y contar con {cliente.curp}.   
		 así como tener domicilio para oír y recibir notificaciones en {cliente.colonia} {cliente.calle} {cliente.numeroext}   .
		</Text>
		<Text style={styles.text}>
		b) Que acredita ser dueño de  ubicado(a) en (CALLE MASCAREÑAS NO.1103 ZONA CENTRO C.P.34000) 
		 lo cual comprueba presentando al momento de la firma del presente contrato copia de escrituras,
		  información ratificada por el L.A. MIGUEL ÁNGEL RODRÍGUEZ TORRES en las instancias correspondientes, 
		  razón por la cual demuestra y comprueba que está facultado ante las autoridades correspondientes 
		  para realizar la venta del bien inmueble señalado con anterioridad.
		</Text>
   		 <Text style={styles.text}>

   		 c) Que tiene capacidad legal y personalidad jurídica para contratar y obligarse sin restricción alguna, 
		 lo cual implica firmar escrituras frente a notario y realizar todos los trámites correspondientes y 
		 que sean necesarios para tal efecto y contar a su vez, con un modo honesto de vida, 
		 lo que declara con fines de conocimiento hacia la inmobiliaria en relación con la seguridad de la prestación del servicio profesional.
		</Text>
   
		<Text style={styles.subtitle}>
		II.-	Declara la inmobiliaria:
		</Text>

		<Text style={styles.text}>
		a) Ser empresa dedicada a la comercialización de bienes inmuebles, 
		la cual tiene su domicilio en Boulevard José María Patoni #244 Col. José Revueltas C.P. 34219 de esta ciudad de Durango, Dgo. 
		y se encuentra registrada ante la Secretaría de Hacienda con R.F.C. ROTM 780321RZ0 como persona física a nombre de 
		Miguel Ángel Rodríguez Torres.
		</Text>
		
		<Text style={styles.text}>
		b) Que el Sr. MIGUEL ÁNGEL RODRÍGUEZ TORRES, 
		es Gerente de la empresa Tu Hogar Inmobiliaria y 
		cuenta con certificación por parte de infonavit y 
		con certificación para la comercialización de bienes inmuebles, 
		esto para garantía del servicio por parte de la inmobiliaria hacia el cliente.
		</Text>
    	 
		<Text style={styles.subtitle}>
			III.- Ambas partes declaran:
		</Text>

		<Text style={styles.text}>
			Que se reconocen mutuamente la personalidad y la forma de acreditamiento manifestadas en las declaraciones que anteceden, 
			razón por la cual las partes también reconocen recíprocamente la personalidad jurídica para suscribir el presente CONTRATO, 
			no existiendo entre ellas incapacidad legal o vicio del consentimiento alguno y que, en tal virtud, 
			se encuentran de manera libre y voluntaria y no tienen inconveniente alguno para celebrar y suscribir el presente CONTRATO. 
		</Text>
		
		<Text style={styles.text}>
			Primera.- El cliente declara requerir los servicios de la Inmobiliaria, 
		por tal motivo suscriben las partes en realizar el presente contrato civil de prestación de servicios profesionales, 
		mismo que se sujeta a las disposiciones el código fiscal federal vigente, y a la legislación equivalente en los estados,  
		renunciando a cualquier otro fuero o ámbito de aplicación legal y 
		concretamente le encomienda la venta de casa ubicada en (CALLE MASCAREÑAS NO.1103 ZONA CENTRO) C.P.34000,  
		obligándose por su parte la inmobiliaria a realizar dichas encomiendas con toda diligencia y capacidad que se requiera,
		 así como a prestar el servicio contratado con personal apto y capacitado para ello y bajo autorización del gerente para concretar el servicio.
		</Text>	 
		<Text style={styles.text}>
			Segunda.- Las partes acuerdan y establecen como importe del valor del inmueble la cantidad de {numeral(contrato.montototal).format('$0,0')}mxn,
		a reserva de la cantidad que arroje el avalúo, 
		monto del cual el cliente pagará una comisión correspondiente a (COMISION) o en su defecto el  % del valor de la operación, 
		una vez realizada, 
		formalizada y liquidada la operación inmobiliaria. 
		El cliente se compromete a liquidar los honorarios correspondientes a la inmobiliaria 
		al momento inmediato de ser concluida la función laboral para la cual fue contratado 
		mediante un depósito interbancario en la cuenta de la empresa Tu Hogar Inmobiliaria.
		</Text>
		<Text style={styles.text} >
			Tercera.- Manifiestan las partes que el contrato lo celebran por un periodo de ,
		el contrato comienza  a partir de la fecha en que se firme el presente, 
		siendo esta el día de hoy {moment(contrato.fhcreacion).format("dddd, Do [de] MMMM [de] YYYY")}.
		</Text>
		<Text style={styles.text} break>
		Cuarta.- La Inmobiliaria se obliga a realizar la promoción respectiva para lograr la venta del bien inmueble propiedad del cliente,
		utilizando todos los medios y servicios con los que cuenta actualmente, tales como medios de internet, 
		periódico, lonas y carteles de publicidad. Así mismo, 
		la inmobiliaria se obliga a cubrir los gastos de promoción y publicidad derivados del presente contrato.
		</Text>
			 
      <Text style={styles.text}>
        Quinta.- El cliente se obliga a liquidar al momento de la venta del bien inmueble, 
		el pago de las contribuciones e impuestos que le correspondan por ley originados por dicho evento,
		tales como el certificado de  libertad de gravamen expedida por el registro público de la propiedad del estado,
		el pago del impuesto predial estatal y pago del impuesto sobre la renta, y en su caso, 
		el plano del lote de terreno y los respectivos documentos que fueren requeridos por el notario que solicite la parte compradora.
      </Text>
    

      <Text style={styles.text}>
        Sexta.- La inmobiliaria manejará un término de exclusividad a nombre de Tú Hogar Inmobiliaria, 
		esto frente a las empresas del medio inmobiliario para respaldar el presente contrato, 
		o en su caso las instituciones, personas físicas o morales las cuales le soliciten acreditarse a la empresa Inmobiliaria, 
		o su representante , siendo en este caso el L.A. Miguel Ángel Rodríguez Torres, entendiéndose que la empresa tiene el compromiso de dar prioridad en la 
		venta al  bien inmueble objeto de este contrato, adjunto como parte de su inventario de propiedades, 
		y el cliente  tiene la obligación de dar la confianza total para cerrar una operación de compraventa con cualquier tipo de cliente, 
		independientemente si es de tipo familiar, de tipo amistad, parentesco político o empresarial, instituciones, 
		personas físicas o morales u en su caso otras empresas inmobiliarias, para evitar confusiones y alteraciones del precio, 
		así como contar y manejar con diligencia y orden la compra venta. En caso de que el cliente decida formalizar la operación 
		sin tomar en consideración a la parte inmobiliaria, queda obligado de cualquier forma a cubrir el monto de comisión pactada 
		en la cláusula segunda del presente contrato.

      </Text>

      <Text style={styles.text}>
       Séptima.- La inmobiliaria se reserva el derecho de compartir un monto de comisión respectivo de pago, 
	   frente a otra empresa inmobiliaria que canalice un posible comprador.
      </Text>

      <Text style={styles.text}>
       Octava.- El contrato terminará a su vez por los siguientes motivos:
      </Text>

      <Text style={styles.text}>
       A) Por la venta de la propiedad por medio de “LA INMOBILIARIA”, 
		lo cual obliga a EL CLIENTE al pago de honorarios de acuerdo con lo declarado en el presente CONTRATO.
      </Text>

      <Text style={styles.text}>
       B) Por mutuo consentimiento. 
      </Text>

		<Text style={styles.text}>
		C)	Por la venta de manera directa la propiedad objeto de este CONTRATO por parte de “EL CLIENTE” lo 
			cual obligara a este a cubrir de manera íntegra el pago de honorarios estipulados en el presente CONTRATO.
		</Text>
	
	<Text style={styles.text}>
		Novena.- En caso de surgir algún litigio con motivo de la aplicación o incumplimiento del presente contrato, 
		las partes se someterán a la competencia  tribunales civiles del estado de Durango.
	</Text>

	<Text style={styles.text}>
		Décima.- La inmobiliaria deberá guardar el secreto profesional sobre los  asuntos que se le confíen,
		respondiendo por daños y perjuicios en caso de violación. Así mismo se deberá manejar con sinceridad,
		integridad y profesionalismo y mostrar absoluta confianza en el cliente. de la misma manera,
		el cliente para contar con el servicio de garantía por parte de la inmobiliaria se deberá manejar bajo los mismos criterios y
		acepta que conformará con la inmobiliaria, un lazo de confianza y unión para el logro de un fin común, 
		el de vender la propiedad señalada en la cláusula primera.
	</Text>

	<Text style={styles.text}>
		Undécima.- La inmobiliaria se compromete a realizar todos los trámites de documentación a reserva del cliente. 
		 En caso de requerirse el cliente se compromete a firmar una carta poder para que la inmobiliaria pueda llevar 
		 a cabo la gestión de los documentos que en su caso se requieran tramitar, así como para realizar las acciones 
		 que se requieran para darle agilidad al expediente crediticio en cualquier tipo de institución gubernamental.
	</Text>

	<Text style={styles.text}>
		Duodécima. - En caso de llegar a requerirse, ambas partes manifiestan que se someterán a las leyes y 
		disposiciones civiles que regulan los Tribunales del Estado de Durango.
	</Text>

	<Text  style={styles.text}>
	Leído el presente contrato las partes, lo ratifican en todo.
	</Text>
	
	<Text  style={styles.text}>
	Durango, Dgo. a {moment(contrato.fhcreacion).format("dddd, Do [de] MMMM [de] YYYY")}
	</Text>
	 


      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
);

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Times-Bold'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

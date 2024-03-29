"use client"

import { Document, Font, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import moment from "moment";
import 'moment/locale/es';

moment.locale("es")
let numeral = require('numeral');
export const ContratoPDF = ({cliente,contrato,lote}) => (
	
  <Document>
    <Page style={styles.body}  >
      <View>
		<Image style={styles.image} src={"/descarga.jpg"}>

		</Image>
	  </View>
      <Text style={styles.title}>Tu Hogar Inmobiliaria</Text>
      
      <Text style={styles.title3}>
        CONTRATO CIVIL DE PRESTACION DE SERVICIOS PROFESIONALES  
      </Text>
      <Text style={styles.title2}>
        PROPIEDAD 
      </Text>
      <Text style={styles.text}>
        Que celebran por una parte C.P. <Text style={styles.bold}>{cliente.nombre}</Text> quien para los efectos del presente contrato se le denominará “EL CLIENTE”, 
		y por la otra parte la empresa denominada <Text style={styles.bold}> TU HOGAR INMOBILIARIA</Text>, 
		representada en este acto por el <Text style={styles.bold}> L.A. MIGUEL ÁNGEL RODRÍGUEZ TORRES</Text>, 
		representante legal y propietario de esta, quien a su vez se le denominará para efectos del presente contrato <Text style={styles.bold}> “LA INMOBILIARIA”</Text> , 
		al tenor de las siguientes:.
      </Text>
	  <Text style={styles.title2}>
		DECLARACIONES
	  </Text>
		<Text style={styles.subtitle}>
		I.-	DECLARA EL CLIENTE:

		</Text>
		<Text style={styles.text}>

	 	a) C.P. <Text style={styles.bold}>{cliente.nombre}</Text> declara ser , 
		mayor de edad, de estado <Text style={styles.bold}>{cliente.estadocivil}</Text> ,
		 de <Text style={styles.bold}>{cliente.ocupacion}</Text> y contar con <Text style={styles.bold}>{cliente.curp}</Text>.   
		 así como tener domicilio para oír y recibir notificaciones en <Text style={styles.bold}>{cliente.colonia} {cliente.calle} {cliente.numeroext} </Text>   .
		</Text>
		<Text style={styles.text}>
		b) Que acredita ser dueño de  ubicado(a) en <Text style={styles.bold}>CALLE MASCAREÑAS NO.1103 ZONA CENTRO C.P.34000 </Text>  
		 lo cual comprueba presentando al momento de la firma del presente contrato copia de escrituras,
		  información ratificada por el<Text style={styles.bold}> L.A. MIGUEL ÁNGEL RODRÍGUEZ TORRES</Text> en las instancias correspondientes, 
		  razón por la cual demuestra y comprueba que está facultado ante las autoridades correspondientes 
		  para realizar la venta del bien inmueble señalado con anterioridad.
		</Text>
   		 <Text style={styles.text}>

   		 c) <Text style={styles.bold}>Que tiene capacidad legal y personalidad jurídica para contratar y obligarse sin restricción alguna,</Text> 
		  lo cual implica firmar escrituras frente a notario y realizar todos los trámites correspondientes y 
		 que sean necesarios para tal efecto y contar a su vez, con un modo honesto de vida, 
		 lo que declara con fines de conocimiento hacia la inmobiliaria en relación con la seguridad de la prestación del servicio profesional.
		</Text>
   
		<Text style={styles.subtitle}>
			
		II.-	Declara la inmobiliaria:
		</Text>

		<Text style={styles.text}>
		a) Ser empresa dedicada a la comercialización de bienes inmuebles, 
		la cual tiene su domicilio en <Text style={styles.bold}>Boulevard José María Patoni #244 Col. José Revueltas C.P. 34219</Text> de esta ciudad de Durango, Dgo. 
		y se encuentra registrada ante la Secretaría de Hacienda con <Text style={styles.bold}>R.F.C. ROTM 780321RZ0</Text> como persona física a nombre de 
		
		
		</Text>
		
		<Text style={styles.text}>
		b) Que el <Text style={styles.bold}>Sr. MIGUEL ÁNGEL RODRÍGUEZ TORRES</Text>, 
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
			razón por la cual las partes también reconocen recíprocamente la personalidad jurídica para suscribir el presente <Text style={styles.bold}>CONTRATO</Text>, 
			no existiendo entre ellas incapacidad legal o vicio del consentimiento alguno y que, en tal virtud, 
			se encuentran de manera libre y voluntaria y no tienen inconveniente alguno para celebrar y suscribir el presente <Text style={styles.bold}>CONTRATO</Text>. 
		</Text>
		
		<Text style={styles.text}>
			<Text style={styles.bold}>Primera.- El cliente declara requerir los servicios de la Inmobiliaria</Text>, 
		por tal motivo suscriben las partes en realizar el presente contrato civil de prestación de servicios profesionales, 
		mismo que se sujeta a las disposiciones el código fiscal federal vigente, y a la legislación equivalente en los estados,  
		renunciando a cualquier otro fuero o ámbito de aplicación legal y 
		<Text style={styles.bold}> concretamente le encomienda la venta de casa ubicada en CALLE MASCAREÑAS NO.1103 ZONA CENTRO C.P.34000 </Text>,  
		obligándose por su parte la inmobiliaria a realizar dichas encomiendas con toda diligencia y capacidad que se requiera,
		 así como a prestar el servicio contratado con personal apto y capacitado para ello y bajo autorización del gerente para concretar el servicio.
		</Text>	 
		<Text style={styles.text}>
			Segunda.- Las partes acuerdan y establecen como importe del valor del inmueble la cantidad de <Text style={styles.bold}> {numeral(contrato.montototal).format('$0,0')} mxn,
		a reserva de la cantidad que arroje el avalúo, 
		monto del cual el cliente pagará una comisión correspondiente a {contrato.comision} o en su defecto el % del valor de la operación </Text>, 
		una vez realizada, 
		formalizada y liquidada la operación inmobiliaria. 
		El cliente se compromete a liquidar los honorarios correspondientes a la inmobiliaria 
		al momento inmediato de ser concluida la función laboral para la cual fue contratado 
		mediante un depósito interbancario en la cuenta de la empresa Tu Hogar Inmobiliaria.
		</Text>
		<Text style={styles.text} >
			Tercera.- Manifiestan las partes que el contrato lo celebran por un periodo de ,
		el contrato comienza  a partir de la fecha en que se firme el presente, 
		siendo esta el día de hoy 
		<Text style={styles.bold}> {moment(contrato.fhcreacion).format("dddd, Do [de] MMMM [de] YYYY")}</Text> .
		</Text>


		<Text style={styles.text} >
		Cuarta.- La Inmobiliaria se obliga a realizar la promoción respectiva para lograr la venta del bien inmueble propiedad del cliente,
		utilizando todos los medios y servicios con los que cuenta actualmente, tales como medios de internet, 
		periódico, lonas y carteles de publicidad. Así mismo, 
		la inmobiliaria se obliga a cubrir los gastos de promoción y publicidad derivados del presente contrato.
		</Text>
			 
      <Text style={styles.text} >
        <Text style={styles.bold}>Quinta.- El cliente se obliga a liquidar al momento de la venta del bien inmueble, 
		el pago de las contribuciones e impuestos que le correspondan por ley originados por dicho evento,</Text>
		tales como el certificado de  libertad de gravamen expedida por el registro público de la propiedad del estado,
		el pago del impuesto predial estatal y pago del impuesto sobre la renta, y en su caso, 
		el plano del lote de terreno y los respectivos documentos que fueren requeridos por el notario que solicite la parte compradora.
      </Text>
    

      <Text style={styles.text} break>
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
       A) Por la venta de la propiedad por medio de  <Text style={styles.bold}>“LA INMOBILIARIA”</Text>, 
		lo cual obliga a <Text style={styles.bold}>EL CLIENTE</Text> al pago de honorarios de acuerdo con lo declarado en el presente <Text style={styles.bold}>CONTRATO</Text>.
      </Text>

      <Text style={styles.text}>
       B) Por mutuo consentimiento. 
      </Text>

		<Text style={styles.text}>
		C)	Por la venta de manera directa la propiedad objeto de este <Text style={styles.bold}>CONTRATO</Text> por parte de <Text style={styles.bold}>“EL CLIENTE”</Text> lo 
			cual obligara a este a cubrir de manera íntegra el pago de honorarios estipulados en el presente <Text style={styles.bold}>CONTRATO.</Text>
		</Text>
	
	<Text style={styles.text}>
		<Text style={styles.bold}>Novena.- </Text> En caso de surgir algún litigio con motivo de la aplicación o incumplimiento del presente contrato, 
		<Text style={styles.bold}>las partes se someterán a la competencia  tribunales civiles del estado de Durango.</Text>
	</Text>

	<Text style={styles.text}>
		<Text style={styles.bold}>Décima.-  La inmobiliaria deberá guardar el secreto profesional</Text> sobre los  asuntos que se le confíen,
		respondiendo por daños y perjuicios en caso de violación. Así mismo se deberá manejar con sinceridad,
		integridad y profesionalismo y mostrar absoluta confianza en el cliente. de la misma manera,
		el cliente para contar con el servicio de garantía por parte de la inmobiliaria se deberá manejar bajo los mismos criterios y
		acepta que conformará con la inmobiliaria, un lazo de confianza y unión para el logro de un fin común, 
		el de vender la propiedad señalada en la cláusula primera.
	</Text>

	<Text style={styles.text}>
		<Text style={styles.bold}>Undécima.- La inmobiliaria se compromete a realizar todos los trámites de documentación a reserva del cliente. </Text>
		 En caso de requerirse el cliente se compromete a firmar una carta poder para que la inmobiliaria pueda llevar 
		 a cabo la gestión de los documentos que en su caso se requieran tramitar, así como para realizar las acciones 
		 que se requieran para darle agilidad al expediente crediticio en cualquier tipo de institución gubernamental.
	</Text>

	<Text style={styles.text}>
		<Text style={styles.bold}>Duodécima. -</Text> En caso de llegar a requerirse, ambas partes manifiestan que se someterán a las leyes y 
		disposiciones civiles que regulan los <Text style={styles.bold}>Tribunales del Estado de Durango.</Text>
	</Text>

	<Text  style={styles.title3}>
	Leído el presente contrato las partes, lo ratifican en todo.
	</Text>
	
	<Text  style={styles.title2}>
	Durango, Dgo. a <Text style={styles.bold}>{moment(contrato.fhcreacion).format("dddd, Do [de] MMMM [de] YYYY")}</Text> 
	</Text>
	 
	
	
				

			
				
	<Text style={styles.title5}> _____________________________________                                   ________________________________</Text>
	<Text style={styles.title6}>L.A MIGUEL ÁNGEL RORIGUEZ TORRES.                C.P. {contrato.testigo2}</Text>
	<Text style={styles.title9}>       Gerente Tu Hogar inmobiliaria.                                                                       El Cliente.</Text>
	<Text style={styles.title6}>         6182104980.                                                                                          					       6181125074.</Text> 
		
	<Text style={styles.title5}> _____________________________________                                   ________________________________</Text>
	<Text style={styles.title7}>Testigo                                                                                                 Testigo </Text>
	<Text style={styles.title8}>{contrato.testigo1}                                  {contrato.testigo2}</Text>
		
				
		
				
			
	
	
		
      

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
  bold:{
 	margin: 12,
    fontSize: 11,
    textAlign: 'justify',
	fontStyle : "bold",
    fontFamily: 'Times-Bold'
  },

  body: {
	backgroundColor: "",
    paddingTop: 60,
    paddingBottom: 65,
    paddingHorizontal: 60,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  
  title2:{
	 fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title3:{
	 fontSize: 13,
	 margin:20,
    textAlign: 'center',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title4:{
	 fontSize: 12,
	 marginLeft:5,
    textAlign: 'left',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title5:{
	 fontSize: 10,
	 marginTop: 60,
	 marginBottom: 20,
    textAlign: 'justify',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title6:{
	 fontSize: 10,
	 marginLeft: 5,
	 textTransform: "uppercase",
    textAlign: 'justify',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title9:{
	 fontSize: 10,
	 marginLeft: 5,
    textAlign: 'justify',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title7:{
	 fontSize: 10,
	 marginLeft: 40,
    textAlign: 'justify',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  title8:{
	 fontSize: 10,
	 marginLeft: 0,
    textAlign: 'justify',
	textTransform: 'uppercase',
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  div: {
	flexFlow:20
  },
  
  div2: {
	flex: "true",
	alignItems: "center",
	columnGap:40
  },
  

  linea: {
    fontSize: 20,
	marginVertical: 40,
    fontFamily: 'Times-Bold',
	fontStyle : "bold"
  },
  subtitle: {
    fontSize: 12,
    margin: 12,
    fontFamily: 'Times-Bold'
  },
  text: {
    margin: 12,
    fontSize: 12,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },

  textFlex: {
	flex: 20,
	flexFlow: 1 
  },
  textLeft: {
    marginTop: 40,
    fontSize: 12,
    alignItems: 'flex-end',
	flex: 1,
    fontFamily: 'Times-Roman'
  },
  textRight: {
    marginTop: 40,
    fontSize: 12,
    alignItems: 'flex-start',
	flex:1,
	objectPosition: 60,
    fontFamily: 'Times-Roman'
  },
  image: {
	width:200,
	height:200,
    marginVertical: 15,
    marginHorizontal: 150,
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

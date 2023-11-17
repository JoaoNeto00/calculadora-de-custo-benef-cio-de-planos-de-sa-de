function calcular() {
   let display_extrato = document.getElementById("painel-extrato");
   let display_comparador = document.getElementById("painel-comparador");

   if (display_extrato.style.display === "none" || display_extrato.style.display === "") {
      display_extrato.style.display = "block";
   } else {
   }
   if (display_comparador.style.display === "none" || display_comparador.style.display === "") {
      display_comparador.style.display = "block";
   } else {
   }
   calculoOperadoraA()
   calculoOperadoraB()
   mostrarComparador()
   mostrarDados()
   
}

function capturarDados() {
   const taltura = document.getElementById("altura");
   const tpeso = document.getElementById("peso");
   const tidade = document.getElementById("idade");

   const altura = Number(taltura.value);
   const peso = Number(tpeso.value);
   const idade = Number(tidade.value);

   return { altura, peso, idade };
}

function calculoIMC() {
   const dados = capturarDados();
   const altura = dados.altura;
   const peso = dados.peso;

   const imc = peso / (altura * altura);
   return imc.toFixed(2);
}

function calculoOperadoraA() {
   const dados = capturarDados();
   const idade = dados.idade;
   const imc = Number(calculoIMC());

   const calcBasico = 100 + (idade * 10) * (imc / 10);   // Plano básico: 100 + (idade * 10 * (IMC / 10)).
	const calcStandard = (150 + (idade * 15)) * (imc / 10); // Plano standard: (150 + (idade * 15)) * (IMC / 10).
   const calcPremium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);// Plano premium: (200 - (IMC * 10) + (idade * 20)) * (IMC / 10).
   
   const planoBasico = calcBasico;
   const planoStandard = calcStandard;
   const planoPremium = calcPremium;

   mostrarOpA(planoBasico, planoStandard, planoPremium);

   return { planoBasico, planoStandard, planoPremium };
}

function calculoOperadoraB() {
   const imc = Number(calculoIMC());
   const ftComorbidade = fatorComorbidade(imc);

   const calcBasico = 100 + (ftComorbidade * 10) * (imc / 10); //Plano básico: 100 + (fator de comorbidade * 10 * (IMC / 10)).
   const calcStandard = (150 + (ftComorbidade * 15)) * (imc / 10);//Plano standard: (150 + (fator de comorbidade * 15)) * (IMC / 10).
   const calcPremium = (200 - (imc * 10) + (ftComorbidade * 20) * (imc / 10)); //Plano premium: (200 - (IMC * 10) + (fator de comorbidade * 20)) * (IMC / 10).

   const planoBasico = calcBasico;
   const planoStandard = calcStandard;
   const planoPremium = calcPremium;

   mostrarOpB(planoBasico, planoStandard, planoPremium);

   return { planoBasico, planoStandard, planoPremium };
}

function fatorComorbidade(imc) {

   if (imc < 18.5) {
      classificacao = 'Baixo peso'
      return 10;
   } else if (imc >= 18.5 && imc <= 24.9) {
      classificacao = 'Normal'
      return 1;
   } else if (imc >= 25 && imc <= 29.9) {
      classificacao = 'Sobrepeso'
      return 6;
   } else if (imc >= 30 && imc <= 34.9) {
      classificacao = 'Obesidade'
      return 10;
   } else if (imc >= 35 && imc <= 39.9) {
      classificacao = 'Obesidade Mórbida'
      return 20;
   } else if (imc > 40) {
      classificacao = 'Obesidade Mórbida muito grave'
      return 30;
   } else {
      alert('erro fator comorbidade')
   }
}

function comparador() {
   const dadosOpA = calculoOperadoraA();
   const dadosOpB = calculoOperadoraB();

   const planoBasico_A = dadosOpA.planoBasico;
   const planoStandard_A = dadosOpA.planoStandard;
   const planoPremium_A = dadosOpA.planoPremium;

   const planoBasico_B = dadosOpB.planoBasico;
   const planoStandard_B = dadosOpB.planoStandard;
   const planoPremium_B = dadosOpB.planoPremium;

   let listPlanoA = [planoBasico_A, planoStandard_A, planoPremium_A];
   let listPlanoB = [planoBasico_B, planoStandard_B, planoPremium_B];
   let listMinPreco = [];
   let listNomePlano = [];

   for (let i = 0; i < 3; i++) {

      if (listPlanoA[i] < listPlanoB[i]) {
         
         listMinPreco[i] = listPlanoA[i];

         if (listPlanoA[i] == listPlanoA[0]) {
            listNomePlano[0] = "A";
         } else if (listPlanoA[i] == listPlanoA[1]) {
            listNomePlano[1] = "A";
         } else if (listPlanoA[i] == listPlanoA[2]) {
            listNomePlano[2] = "A";
         }

      } else if(listPlanoA[i] == listPlanoB[i]){

         listMinPreco[i] = listPlanoA[i]

       if (listNomePlano[i] == listNomePlano[0] ) {
         listNomePlano[0] = 'A E B'
       } else if(listNomePlano[i] == listNomePlano[1]) {
         listNomePlano[1] = 'A E B'
       }else if (listNomePlano[i] == listNomePlano[2]){
         listNomePlano[2] = 'A E B'
       }

      } else {

         listMinPreco[i] = listPlanoB[i];

         if (listPlanoB[i] == listPlanoB[0]) {
            listNomePlano[0] = "B";
         } else if (listPlanoB[i] == listPlanoB[1]) {
            listNomePlano[1] = "B";
         } else if (listPlanoB[i] == listPlanoB[2]) {
            listNomePlano[2] = "B";
         }

      }
   }

   const minBasico = `plano basico ${listNomePlano[0]} - R$ ${listMinPreco[0].toFixed(2)}`;
   const minStandard = `plano Standard ${listNomePlano[1]} - R$ ${listMinPreco[1].toFixed(2)}`;
   const minPremium = `plano premium ${listNomePlano[2]} - R$ ${listMinPreco[2].toFixed(2)}`;

   return { minBasico, minStandard, minPremium };
}

function mostrarDados() {

   const imc = calculoIMC();
   const ftComorbidade  = fatorComorbidade(imc)

   const localIMC = document.getElementById("id_imc");
   localIMC.innerHTML = `IMC - ${imc}`;
   
   const localClassificacao = document.getElementById('id_classificacao')
   localClassificacao.innerHTML = `classificação - ${classificacao}`;

   const localftComorbidade = document.getElementById("id_comorbidade");
   localftComorbidade.innerHTML = `comorbidade - ${ftComorbidade}`;


}

function mostrarOpA(planoBasico, planoStandard, planoPremium) {
   const valorBasico = planoBasico.toFixed(2);
   const valorStandard = planoStandard.toFixed(2);
   const valorPremium = planoPremium.toFixed(2);

   const localMostrarNome = document.getElementById("id_nomeOperadoraA");
   localMostrarNome.innerHTML = "Operadora A";

   const localPlanoBasico = document.getElementById("id_basico");
   localPlanoBasico.innerHTML = `plano basico: R$ ${valorBasico.toString().replace( ".", "," )}`;
   const localPlanoStandard = document.getElementById("id_standard");
   localPlanoStandard.innerHTML = `plano standard: R$ ${valorStandard.toString().replace( ".", "," )}`;
   const localPlanoPremium = document.getElementById("id_premium");
   localPlanoPremium.innerHTML = `plano premium: R$ ${valorPremium.toString().replace( ".", "," )}`;
}

function mostrarOpB(planoBasico, planoStandard, planoPremium) {
   const valorBasico = planoBasico.toFixed(2)
   const valorStandard = planoStandard.toFixed(2);
   const valorPremium = planoPremium.toFixed(2);

   const MostrarNome = document.getElementById("id_nomeOperadoraB");
   MostrarNome.innerHTML = "Operadora B";

   const localPlanoBasico = document.getElementById("id_basico_b");
   localPlanoBasico.innerHTML = `plano basico: R$ ${valorBasico.toString().replace( ".", "," )}`;
   const localPlanoStandard = document.getElementById("id_standard_b");
   localPlanoStandard.innerHTML = `plano standard: R$ ${valorStandard.toString().replace( ".", "," )}`;
   const localPlanoPremium = document.getElementById("id_premium_b");
   localPlanoPremium.innerHTML = `plano premium: R$ ${valorPremium.toString().replace( ".", "," )}`;
}

function mostrarComparador() {

   const dadosComparador = comparador();

   const minBasico = dadosComparador.minBasico;
   const minStandard = dadosComparador.minStandard;
   const minPremium = dadosComparador.minPremium;

   const mostraNome = document.getElementById('id_nomeComparador')
   mostraNome.innerHTML = "comparador"

   const localMinBasico = document.getElementById("id_minBasico");
   localMinBasico.innerHTML = minBasico.toString().replace( ".", "," );
   const localMinStandard = document.getElementById("id_minStandard");
   localMinStandard.innerHTML = minStandard.toString().replace( ".", "," );
   const localMinPremium = document.getElementById("id_minPremium");
   localMinPremium.innerHTML = minPremium.toString().replace( ".", "," );
}

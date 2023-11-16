function calcular() {

   let display_extrato = document.getElementById('painel-extrato');
   let display_comparador = document.getElementById('painel-comparador')

   if (display_extrato.style.display === "none" || display_extrato.style.display === "") {
      display_extrato.style.display = "block";
   } else {}
   if (display_comparador.style.display === "none" || display_comparador.style.display === "") {
      display_comparador.style.display = "block";
   } else {}

   calculoOperadoraA()
   calculoOperadoraB()
   mostrarComparador()

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

   const calcBasico = parseFloat(100 + (idade * 10) * (imc / 10));
   const calcStandard = parseFloat((150 + (idade * 15) * (imc / 10)));
   const calcPremium = parseFloat(200 - (imc * 10) +(idade * 20) * (imc / 10));

   const planoBasico = calcBasico
   const planoStandard = calcStandard
   const planoPremium = calcPremium

   mostrarOpA(planoBasico,planoStandard,planoPremium)
   
   return { planoBasico, planoStandard, planoPremium };
}

function calculoOperadoraB() {
   const imc = Number(calculoIMC());
   const ftComorbidade = fatorComorbidade(imc);

   const calcBasico = parseFloat(100 + (ftComorbidade * 10) * (imc / 10));
   const calcStandard = parseFloat((150 + (ftComorbidade * 15) ) * (imc / 10));
   const calcPremium = parseFloat((200 - ( imc * 10) + (ftComorbidade * 20)) * (imc / 10));

   const planoBasico = calcBasico
   const planoStandard = calcStandard
   const planoPremium = calcPremium

   mostrarOpB(planoBasico, planoStandard, planoPremium);
   
   return { planoBasico, planoStandard, planoPremium };
}

function fatorComorbidade(imc) {
   if (imc < 18.5) {
      return 10;
   } else if (imc >= 18.5 && imc <= 24.9) {
      return 1;
   } else if (imc >= 25 && imc <= 29.9) {
      return 6;
   } else if (imc >= 30 && imc <= 34.9) {
      return 10;
   } else if (imc >= 35 && imc <= 39.9) {
      return 20;
   } else {
      return 30;
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

   let listaPlanosA = [planoBasico_A, planoStandard_A, planoPremium_A];
   let listaPlanosB = [planoBasico_B, planoStandard_B, planoPremium_B];
   let listMinPreco = [];
   let listNomePlano = [];

   for (let i = 0; i < 3; i++) {

      if (listaPlanosA[i] < listaPlanosB[i]) {

         listMinPreco[i] = listaPlanosA[i];

         if (listaPlanosA[i] == listaPlanosA[0]) {
            listNomePlano[0] = "A";
         } else if (listaPlanosA[i] == listaPlanosA[1]) {
            listNomePlano[1] = "A";
         } else if(listaPlanosA[i] == listaPlanosA[2]) {
            listNomePlano[2] = "A";
         }

      } else {

         listMinPreco[i] = listaPlanosB[i];

         if (listaPlanosB[i] == listaPlanosB[0]) {
            listNomePlano[0] = "B";
         } else if (listaPlanosB[i] == listaPlanosB[1]) {
            listNomePlano[1] = "B";
         } else if (listaPlanosB[i] == listaPlanosB[2]) {
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
   const ftComorbidade = fatorComorbidade(imc);

   const localIMC = document.getElementById("res_imc");
   localIMC.innerHTML = `IMC - ${imc}`;
   const localftComorbidade = document.getElementById("res_ftComorbidade");
   localftComorbidade.innerHTML = `comorbidade - ${ftComorbidade}`;
}

function mostrarOpA(planoBasico, planoStandard, planoPremium) {
   
   const valorBasico = planoBasico.toFixed(2)
   const valorStandard = planoStandard.toFixed(2)
   const valorPremium = planoPremium.toFixed(2)

   const localMostrarNome = document.getElementById("res_nomeOperadoraA");
   localMostrarNome.innerHTML = "Operadora A";

   const localPlanoBasico = document.getElementById("res_basico");
   localPlanoBasico.innerHTML = `plano basico: ${valorBasico}`;
   const localPlanoStandard = document.getElementById("res_standard");
   localPlanoStandard.innerHTML = `plano standard: ${valorStandard}`;
   const localPlanoPremium = document.getElementById("res_premium");
   localPlanoPremium.innerHTML = `plano premium: ${valorPremium}`;
}

function mostrarOpB(planoBasico, planoStandard, planoPremium) {

   const valorBasico = planoBasico.toFixed(2)
   const valorStandard = planoStandard.toFixed(2)
   const valorPremium = planoPremium.toFixed(2)

   const localMostrarNome = document.getElementById("res_nomeOperadoraB");
   localMostrarNome.innerHTML = "Operadora B";

   const localPlanoBasico = document.getElementById("res_basico_b");
   localPlanoBasico.innerHTML = `plano basico: ${valorBasico}`;
   const localPlanoStandard = document.getElementById("res_standard_b");
   localPlanoStandard.innerHTML = `plano standard: ${valorStandard}`;
   const localPlanoPremium = document.getElementById("res_premium_b");
   localPlanoPremium.innerHTML = `plano premium: ${valorPremium}`;
}

function mostrarComparador() {

   const dadosComparador = comparador();

   const minBasico = dadosComparador.minBasico;
   const minStandard = dadosComparador.minStandard;
   const minPremium = dadosComparador.minPremium;

   const localMinBasico = document.getElementById("res_minBasico");
   localMinBasico.innerHTML = minBasico;
   const localMinStandard = document.getElementById("res_minStandard");
   localMinStandard.innerHTML = minStandard;
   const localMinPremium = document.getElementById("res_minPremium");
   localMinPremium.innerHTML = minPremium;
}

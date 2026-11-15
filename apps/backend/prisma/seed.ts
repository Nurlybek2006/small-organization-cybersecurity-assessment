import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const assets = [
  ['Жұмыс үстелі компьютерлері','10 қызметкер қолданатын кеңсе компьютерлері.','Құрылғы','IT жауаптысы',4,'Зиянды бағдарлама немесе рұқсатсыз қол жеткізу','Жаңартулар мен орталықтанған қорғау толық расталмаған','Зиянды бағдарлама файлдарға және қызметтік жүйелерге таралуы мүмкін','Құрылғыларды жаңартып, антивирус күйін тексеру'],
  ['Wi-Fi желісі','Қызметкерлер пайдаланатын сымсыз жергілікті желі.','Желі','IT жауаптысы',5,'Желілік трафикті ұстап қалу','Wi-Fi қорғанысының күйі оқу сценарийінде расталмаған','Жергілікті ресурстарға рұқсатсыз қосылу қаупі','WPA2-AES немесе WPA3, бірегей құпиясөз және қонақ желісін қосу'],
  ['Корпоративтік электрондық пошта','Қызметкерлердің ресми хат алмасу қызметі.','Бұлттық қызмет','Әкімшілік',4,'Тіркелгіні басып алу','Көп факторлы аутентификацияның қосылғаны расталмаған','Ұйым деректеріне рұқсатсыз кіру','Барлық тіркелгіде MFA қосып, фишингке қарсы оқыту өткізу'],
  ['Google Drive','Ортақ құжаттар мен резервтік материалдарға арналған бұлт қоймасы.','Бұлттық қызмет','Әкімшілік',5,'Құпия құжаттардың сыртқа таралуы','Ортақ сілтемелерге қолжетімділік мерзімді тексерілмейді','Оқушы деректеріне рұқсатсыз қол жеткізу','Бөлісу құқығын шектеу, журналды тексеру және резервтік көшірме сақтау'],
  ['Оқушылардың жеке деректері','Оқу орталығы өңдейтін байланыс және үлгерім жазбалары.','Деректер','Оқу ісінің меңгерушісі',5,'Деректердің жария болуы','Қолжетімділік тізімі мен сақтау мерзімі тұрақты қайта қаралмайды','Құпиялылықтың бұзылуы және қызметке сенімнің төмендеуі','Ең аз артықшылық қағидасын және сақтау мерзімін енгізу'],
  ['Wi-Fi маршрутизаторы','Интернет пен кеңсе құрылғылары арасындағы шлюз.','Желі құрылғысы','IT жауаптысы',4,'Маршрутизаторды бұзу','Әдепкі әкімші параметрлері өзгертілгені тексерілмеген','Желінің трафигін бақылауды жоғалту','Әдепкі тіркелгі деректерін ауыстырып, микробағдарламаны жаңарту'],
  ['Желілік принтер','Құжаттарды басып шығаруға арналған ортақ құрылғы.','Құрылғы','Әкімшілік',2,'Басып шығару кезегіндегі құжатты көру','Құрылғының басқару интерфейсі сегменттелмеген болуы мүмкін','Құжаттағы деректерді бөгде адам көруі мүмкін','Қорғалған басып шығару және әкімші интерфейсін шектеу'],
  ['Резервтік көшіру инфрақұрылымы','Қалпына келтіру көшірмелері сақталатын орта.','Деректер','Әкімшілік',5,'Резервтік көшірмелердің жоғалуы','Қалпына келтіру сынағының жиілігі белгісіз','Оқу деректерін қалпына келтіру мүмкін болмауы','Оқшауланған көшірме жасап, тоқсан сайын қалпына келтіруді сынау'],
];
const controls = [
  ['Құпиясөз қауіпсіздігі','Күшті әрі бірегей құпиясөздерді қолдану.','Тіркелгілерді жаппай бұзудан қорғайды.','Құпиясөз менеджерін қолданып, ортақ парольдерді ауыстырыңыз.','Орташа'],
  ['Көп факторлы аутентификация','Құпиясөзге қосымша растау факторын қосу.','Ұрланған құпиясөздің әсерін азайтады.','Электрондық пошта мен бұлттық қызметте MFA қосыңыз.','Жоғары'],
  ['Бағдарламалық жаңартулар','ОЖ мен қолданбалардың қолдау көрсетілетін нұсқасын ұстау.','Белгілі осалдықтарды түзетуге көмектеседі.','Ай сайын жаңартуларды тексеріп, қайта іске қосуды жоспарлаңыз.','Жоғары'],
  ['Антивирустық қорғаныс','Құрылғылардағы зиянды белсенділікті анықтау.','Зиянды бағдарламаның орындалу ықтималдығын төмендетеді.','Қорғаныс күйін, жаңартуды және ескертулерді тексеріңіз.','Жоғары'],
  ['Резервтік көшіру және қалпына келтіру','Маңызды ақпараттың бөлек көшірмесін сақтау.','Қате жою не шифрлау жағдайында қалпына келтіреді.','Көшірмені оқшау сақтап, қалпына келтіруді сынаңыз.','Жоғары'],
];
const policies=[['Құпиясөзді ешкімге айтпаңыз','Құпиясөз жеке қолданысқа арналған және әр қызметте бөлек болуы керек.','Әріптес атынан сұралса да, парольді мессенджермен жібермеңіз.'],['Күдікті сілтемелер мен тіркемелерді ашпаңыз','Жіберушіні басқа арна арқылы тексеріп, күмәнді хатты жауапты адамға жолдаңыз.','Бейтаныс файлды жүктеп ашудың орнына алдымен тексеріңіз.'],['Компьютерді қараусыз қалдырғанда құлыптаңыз','Қысқа үзілістің өзінде экранды құлыптау қажет.','Windows-та Win+L пернелерін басыңыз.'],['Құпия құжатты рұқсатсыз бөліспеңіз','Қолжетімділікті тек міндетіне сай адамдарға беріңіз.','Жалпыға ашық сілтеме орнына нақты пайдаланушыны шақырыңыз.'],['Күдікті оқиғаны дереу хабарлаңыз','Қате сілтемені ашсаңыз да, жасырып қалмай, жауапты қызметкерге хабарлаңыз.','Күдікті кіру ескертуінің уақытын және экрандағы мәтінді тіркеңіз.']];
async function main(){
 const org=await prisma.organization.upsert({where:{name:'Smart Education'},update:{employeeCount:12},create:{name:'Smart Education',employeeCount:12,notes:'Оқу мақсатындағы модельдік ұйым: 12 қызметкер, 10 компьютер, 3 ноутбук, 1 Wi-Fi маршрутизаторы, 1 желілік принтер.'}});
 const rows=[];
 for(const [name,description,category,owner,criticality,threatName,vulnName,consequence,mitigation] of assets){
  const a=await prisma.asset.upsert({where:{id:`demo-${name.toLowerCase().replace(/[^a-zа-я0-9]+/gi,'-')}`},update:{name,description,category,owner,criticality},create:{id:`demo-${name.toLowerCase().replace(/[^a-zа-я0-9]+/gi,'-')}`,organizationId:org.id,name,description,category,owner,criticality}});
  const t=await prisma.threat.upsert({where:{id:`threat-${a.id}`},update:{name:threatName,description:`Оқу мақсатындағы ықтимал сценарий: ${threatName.toLowerCase()}. Нақты тексеру жүргізілмеген.`},create:{id:`threat-${a.id}`,assetId:a.id,name:threatName,description:`Оқу мақсатындағы ықтимал сценарий: ${threatName.toLowerCase()}. Нақты тексеру жүргізілмеген.`}});
  const v=await prisma.vulnerability.upsert({where:{id:`vuln-${a.id}`},update:{name:vulnName,description:`Қолмен енгізілген болжам: ${vulnName.toLowerCase()}. Расталған осалдық емес.`},create:{id:`vuln-${a.id}`,threatId:t.id,name:vulnName,description:`Қолмен енгізілген болжам: ${vulnName.toLowerCase()}. Расталған осалдық емес.`}});
  const likelihood=[3,4,4,3,3,3,2,3][rows.length], impact=criticality;
  const score=likelihood*impact, severity=score<=4?'LOW':score<=9?'MEDIUM':'HIGH';
  const r=await prisma.riskAssessment.upsert({where:{id:`risk-${a.id}`},update:{likelihood,impact,score,severity,consequence,justification:'Симуляцияланған бастапқы бағалау. Ықтималдық пен әсер оқу сценарийіне сәйкес қолмен берілген; нақты аудит емес.',mitigation},create:{id:`risk-${a.id}`,assetId:a.id,threatId:t.id,vulnerabilityId:v.id,likelihood,impact,score,severity,consequence,justification:'Симуляцияланған бастапқы бағалау. Ықтималдық пен әсер оқу сценарийіне сәйкес қолмен берілген; нақты аудит емес.',mitigation,isSimulated:true}});
  await prisma.riskAssessmentHistory.upsert({where:{id:`history-initial-${a.id}`},update:{},create:{id:`history-initial-${a.id}`,assessmentId:r.id,likelihood,impact,score,severity,note:'Бастапқы симуляцияланған бағалау'}}); rows.push({asset:a,risk:r});
 }
 for(const [index,[name,description,purpose,instructions,priority]] of controls.entries()) {
  const c=await prisma.securityControl.upsert({where:{organizationId_name:{organizationId:org.id,name}},update:{description,purpose,instructions,priority},create:{organizationId:org.id,name,description,purpose,instructions,priority,responsible:'IT жауаптысы'}});
  const assetIndexes=[[2,3,4],[2,3],[0,5,6],[0],[3,4,7]][index];
  await prisma.assetSecurityControl.createMany({data:assetIndexes.map(i=>({assetId:rows[i].asset.id,controlId:c.id})),skipDuplicates:true});
 }
 for(const [i,[title,detail,example]] of policies.entries()) await prisma.securityPolicy.upsert({where:{organizationId_position:{organizationId:org.id,position:i+1}},update:{title,detail,example},create:{organizationId:org.id,title,detail,example,position:i+1}});
 const recs=[['Wi-Fi желісін қорғауды күшейту',1,'Жоғары'],['Пошта тіркелгілерінде MFA қосу',2,'Жоғары'],['Оқушы деректеріне қолжетімділікті шектеу',4,'Жоғары']];
 for(const [title,index,priority] of recs){const risk=rows[index].risk; await prisma.recommendation.upsert({where:{id:`rec-${index}`},update:{title,priority},create:{id:`rec-${index}`,organizationId:org.id,riskId:risk.id,title,description:risk.mitigation,priority,steps:'Жауапты тұлғаны белгілеу; өзгерісті енгізу; орындалуын құжаттап, тәуекелді қайта бағалау.',status:'OPEN',responsible:'IT жауаптысы',expectedBenefit:'Рұқсатсыз кіру және деректердің таралу ықтималдығын азайту.'}});}
 console.log(`Seed аяқталды: ${rows.length} актив, 5 бақылау шарасы, 5 саясат.`);
}
main().finally(()=>prisma.$disconnect());

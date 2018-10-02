import React, { Component } from 'react';
import './App.css';
import AnimatedSphere from './AnimatedSphere.js';
import styled from 'styled-components';
import { injectGlobal } from 'styled-components';
import { keyframes } from 'styled-components';

injectGlobal`
  html {
    max-width: 100%;
    background-color:black;
    overflow-x: hidden;
  }
  a:link {
    text-decoration: none;
}

a:visited {
    text-decoration: none;
}

a:hover {
    text-decoration: none;
}

a:active {
    text-decoration: none;
}

`

const SuperDiv = styled.div`
overflow-y:scroll;
`
const StyleTile = styled.div`

width : ${props => props.clicked ?  '100%' : '33.333333%'  };
height : ${props => props.clicked ?  props.h+ 'px':'auto'  };
position: ${props => props.clicked ?  'fixed' : 'static'  };
top:${props=>props.clicked? '0px':''};
align-elements: ${props=> props.clicked ? 'center': 'left'};
background-color : ${props=> props.clicked ? '#fff': '#333333'};
box-shadow: 0 0px 0px 0 rgba(0,0,0,0.2);
transition: 0.3s;
z-index: ${props => props.clicked ? 1:0};
box-shadow: 0 0px 0px 0 rgba(-.5,0,0,0.2);
&: hover{
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  z-index:1;
  height: ${props => props.clicked ?  props.h + 'px' :(props.h/2)+50+'px'  };

}
@media (max-width: 700px) {
  width : 100%;
  height : ${props => props.clicked ?  props.h + 'px':'300px'  };
  margin-bottom:auto;
  z-index:${props => props.clicked ? '1':'0'};
  &: hover{
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    z-index:${props => props.clicked ? '1':'0'};
    height: ${props => props.clicked ?  props.h + 50+ 'px' :'350px'  };

  }
`
const StyleImage = styled.img`
    display:${props=> props.clicked? 'none':'initial'};
    cursor: pointer;
    background-image: url(${props=>  props.src});
    position: absolute;
    background-position: center center;
    z-index:1;
    clip: ${ props => true ? 'none':'rect(-500px,'+((props.w/3))+ 'px,'+(props.h/2)+ 'px,-700px)'};
    right: ${props => props.clicked? '51%':''};
    top: ${props => props.clicked? '5%':''};
    width: 33.33%;
    height:45%;
    max-width : ${props => props.clicked? '0px':((props.w/2) )+ 'px'};
    max-height : ${props => props.clicked ?  '0px':''};
    @media (max-width: 700px) {
      clip:auto;
      width:${ props => props.clicked ? '0px': '100%'}
      max-width : ${ props => props.clicked ? '100%': '200%'};;
      max-height : 100%;
      top: ${props => props.clicked? '10%':''};
      right: ${props => props.clicked? '0':''};
      }
`
const BodyImage = styled.img`

    position: relative;
    background-image: url(${props=>props.src});
    background-repeat:no-repeat;
    top:-200px;
    max-width:65%;
    height:auto;
    max-height: 550px;
    left: ${props=>props.right? '50%':'0px'};
    @media (max-width: 700px) {
      width:100%;
      top:0px;
      max-width:100%;
      }
`

const BodyImageSP = styled.img`
    position: relative;
    background-image: url(${props=>props.src});
    background-repeat:no-repeat;
    top:${props=> props.top};
    max-width:60%;
    height:auto;
    max-height: 550px;
    left: ${props=>props.right? '50%':'0px'};
    @media (max-width: 700px) {
      width:100%;
     top:0px;
      max-width:100%;
      }

`
const BodyImageR = styled.img`
    position: relative;
    background-image: url(${props=>props.src});
    background-repeat:no-repeat;
    top:-175px;
    max-width:60%;
    height:auto;
    max-height: 550px;
    right: -40%;
    @media (max-width: 700px) {
      top:0px;
      width:100%;
      right: 0%;
      max-width:100%;
      }
`
const BodyImageRSP = styled.img`
    position: relative;
    background-image: url(${props=>props.src});
    background-repeat:no-repeat;
    top:${props=> props.top};
    max-width:60%;
    height:auto;
    max-height: 550px;
    right: -40%;
    @media (max-width: 700px) {
      top:0px;
      width:100%;
      right: 0%;
      max-width:100%;
      }
    `



const StyledTitle = styled.h1`

   font-family: 'Space Mono', monospace;
   position: ${props=> props.clicked ? 'absolute' : 'absolute'};
   right: ${props => props.clicked ? '5%':'auto'};
   font-size: ${props => props.clicked ? '5vw':'1px'};
    z-index:1;
   @media (max-width: 700px) {
     z-index:1;
     font-size: 7vw;
     color:${props=> props.clicked ? '#000' :props.color||'#FFF' };
     }
`
const SubStyledTitle = styled.h1`

   font-family: 'Montserrat', sans-serif;
   position: ${props=> props.clicked ? 'absolute' : 'absolute'};
   right: ${props => props.clicked ? '5%':'auto'};
   font-size: ${props => props.clicked ? '1.5vw':'1px'};
   top:-2%;
    z-index:1;
   @media (max-width: 700px) {
     z-index:1;
     font-size:4vw;
     font-size: ${props => props.clicked ? '4vw':'.1px'};
     color:${props=> props.clicked ? '#000' :props.color||'#FFF' };
     }
`




const TileContents = styled.div`
  position: absolute;
  right:0%;
  height:100%;
  overflow-y:scroll;
  -webkit-overflow-scrolling: touch;
`
const StP = styled.p`
position: relative;
font-family: 'Montserrat', sans-serif;
font-size: 1.2vw;
word-break: normal;
width: 32%;
left:65%;
top: 150px;
@media (max-width: 700px) {
  position: relative;
  font-size: 4vw;
  left:5%;
  width: 90%;
  top:0px;
  }
`
const StPL = styled.p`
position: relative;
font-family: 'Montserrat', sans-serif;
font-size: 1.2vw;
word-break: normal;
width: 32%;
left:5%;
top: 150px;
@media (max-width: 700px) {
  position: relative;
  font-size: 4vw;
  left:5%;
  width: 90%;
  top:0px;
  }
`

const Section = styled.div`


 height: auto;
 min-height: 250px;
 max-height: 650px;
 width: 100%;
 opacity: 50%;
 background-color: ${props=> props.color};


`

const BaseSection = Section.extend`
text-align:center;
background-color:#F5F5F5;
@media (max-width: 700px){
  height:200px;
}
`

const SubHead = styled.div`


 height: 76px;
 width: 100%;
 opacity: 50%;
 background-color: ${props=> props.color};


`

const ROW = styled.div`
width:100%;
height : ${props => props.h/2 + 'px'  };
display: grid | inline-grid;
margin-left: auto;
margin-right: auto;
display: flex;
flex-direction: row;
max-width: 1440px;

@media (max-width: 700px) {
  background-color: #333333;
    flex:auto;
    height : auto;
    flex-direction:column;
    padding:0px;
  }
`



const Buffer = ROW.extend`
height:140px;
background-color: #f9f6f2;
text-color:#FFF;
z-axis: 1;
@media (max-width: 700px){
  height:0px;
}
`

const Foot = styled.div`
background-color: black;
color:#fff;
size:12px;
height:100px;
text-align:center;
`

const Head = Foot.extend`
 position:absolute;
 height:140px;
 top:0px;
 width:100%;
 size:10vw;
 left:0px
 text-align:left;
 @media (max-width: 700px){
 position:static;
  z-axis:-1;
 }
`
const travel = keyframes`
from {
    top:500px;
  }

  to {
    top:0px;
  }

`
const travel2 = keyframes`
from {
    left:-1500px;
    opacity: 0;
  }

  to {
    left:0px;
    opacity: 1;
  }

`



const B = styled.img`
   background-image: url(${props=>props.src});
   height: 25px;
   border-radius: 25px;
   &: hover{
     box-shadow: 0 5px 5px 0 rgba(0,0,0,0.2);
   }

`
const Ba = styled.img`
   background-image: url(${props=>props.src});
   backgroud-repeat: no-repeat;
   height: .75em;
   border-radius: 1em;
   &: hover{
     box-shadow: 0 5px 5px 0 rgba(0,0,0,0.2);
   }

`

const CloseButton = styled.div`
cursor: pointer;
 position: absolute;
 top: 5px;
 left:5px;
`


const HeaderText = StyledTitle.extend`
   color: #fff;
   font-size: 8vw;
   animation: ${travel} 1s ease ;
   @media (max-width: 700px){
     font-size: 13vw;
   }
`
const SubHeaderText = styled.p`
position: ${props=> props.clicked ? 'absolute' : 'absolute'};
right: ${props => props.clicked ? '5%':'auto'};
top:-10px;
   color: #fff;
   font-size: 2vw;
   animation: ${travel} 1.5s ease ;
   opacity:1;
   @media (max-width: 700px){
     top:5px;
     font-size: 3vw;
   }
`
const HeaderTextB = StyledTitle.extend`
   color: #fff;
   font-size: 8vw;
   top: ${props=>((props.height/2) +50)+'px'};
   animation: ${travel2} 1s ease ;
   opacity:1;
   @media (max-width: 700px){
     font-size: 13vw;
     top: ${props=>((props.height/3) +(props.height/3))+'px'};
   }
`
const SubHeaderTextB = styled.p`
   position: ${props=> props.clicked ? 'absolute' : 'absolute'};
   right: ${props => props.clicked ? '5%':'auto'};
   color: #fff;
   font-size: 2vw;
   top: ${props=>((props.height/2) +40)+'px'};
   animation: ${travel2} 1.5s ease ;
   opacity:1;
   @media (max-width: 700px){
     font-size: 3.2vw;
     top: ${props=>((props.height/3) +(props.height/3))+'px'};
   }
`
const CompassText = styled.p`
position: absolute;
   right: 5%;
   color: #fff;
   font-size: 1vw;
   top: 40%;
   width:30%;
   opacity:1;
   @media (max-width: 700px){
     top:20%;
     left:5%;
     width:75%;
     font-size: 2.5vw;
   }
`



const Button = styled.a`
cursor: pointer;
position: relative;
top:${props=> props.nah ? "0px":"50px"};
text-decoration: none;
border-style: solid;
max-width:10%;
height:50px;
border-width: 3px;
border-color: ${props=>props.color};
color:${props=>props.color};
border-radius: 50px;
padding: 14px 25px;
&: hover{

 background-color: ${props=>props.color};
 color:black;
 box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
@media (max-width: 700px){
  top:${props=> props.nah ? "0px":"150px"};

}

`


const NButton =styled.a`
position:relative;
text-decoration: none;
border-style: solid;
max-width:10%;
height:50px;
border-width: 3px;
cursor: pointer;
border-radius: 50px;
padding: 14px 25px;
color:#F09F31;
border-color:#F09F31;
&: hover{
 background-color: none;
 color:#F09F31;
 box-shadow: none;
}

`
const ViewCaseStudy = styled.div`
   display: block;
   text-align:center;
   font-family: 'Space Mono', monospace;
   color: #FFF;
   position: relative;
   top:90%;
   z-axis:-1;
   &: hover{
    display:block;

   }
`






class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      photoarray:this.props.images,
      i:0,
      width:0,
      height:0,

    };
    // This binding is necessary to make `this` work in the callback
    this.expand = this.expand.bind(this);
     this.updateWindowDimensions=this.updateWindowDimensions.bind(this);
    this.compress = this.compress.bind(this);
  }
  componentDidMount(){
    window.addEventListener('resize', this.updateWindowDimensions());


  }

  componentWillUnmount(){
    window.removeEventListener('resize', this.updateWindowDimensions())
  }
  updateWindowDimensions(){
    this.setState({width: window.innerWidth, height: window.innerHeight});
    this.forceUpdate();

  }
  expand = () => {
    document.body.style.overflowY = "hidden";
    this.setState({clicked:true});
  }
  compress = () => {
    this.setState({clicked:false,i:0});
    document.body.style.overflowY = "auto";
  }

  render(){
     const props = this.props;

    return(
      <StyleTile   clicked={this.state.clicked}  w={this.state.width} h={this.state.height}>

      <StyledTitle color={props.color} clicked={this.state.clicked} w={this.state.width} h={this.state.height}>
      {props.title}
      </StyledTitle>
      <SubStyledTitle color={props.color} clicked={this.state.clicked} w={this.state.width} h={this.state.height}>
      {props.subtitle}
      </SubStyledTitle>
      <StyleImage onClick={this.expand}

              src={this.state.photoarray[0]}
       clicked={this.state.clicked} w={this.state.width} h={this.state.height} />
       <TileContents>
       { this.state.clicked ? (
        <div>
          {this.props.children}
        <div>
        </div>
      </div>):
      (<div/>)
}
</TileContents>
{this.state.clicked? <CloseButton  onClick={this.compress}> <B src='http://seanpatrick.nyc/Assets/Btns/closebtn.png'/></CloseButton>:<ViewCaseStudy onClick={this.expand} clicked={props.clicked}>VIEW CASE STUDY</ViewCaseStudy>}
      </StyleTile>
    );}
}


const GM = ['http://seanpatrick.nyc/Assets/GlassMenagerie/first.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/ControlScheme.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/UsefulAbstraction.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/WireframeVsActual.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/GM5.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/whole.png',
'http://seanpatrick.nyc/Assets/GlassMenagerie/GM6.png',
            ];
const VRWQ = ['http://seanpatrick.nyc/Assets/VRWorldQ/AllTogetherNow.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/Before.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/UserFlow.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/VRWApp.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/VRWTablet.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/Problem.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/NewFlow.png',
'http://seanpatrick.nyc/Assets/VRWorldQ/BrandStudy.png',

];

const AC = ['http://seanpatrick.nyc/Assets/ThreeDeeArt.png',
'http://seanpatrick.nyc/Assets/ArtsCodesWhole.png',
'http://seanpatrick.nyc/Assets/NavBar.png',
'http://seanpatrick.nyc/Assets/ContentShowOff.png',
'http://seanpatrick.nyc/Assets/DATACOVER.png',

];

const PARC = ['http://seanpatrick.nyc/Assets/Parc/parcAD.png',
'http://seanpatrick.nyc/Assets/Parc/ParcTwo.png',
'http://seanpatrick.nyc/Assets/Parc/ParcThree.png',
'http://seanpatrick.nyc/Assets/Parc/ParcFour.png',
];

const PENSIVE = ['http://seanpatrick.nyc/Assets/Pensive/Prototype.png',
'http://seanpatrick.nyc/Assets/Pensive/PersonasUseCases.png',
'http://seanpatrick.nyc/Assets/Pensive/HIFIDesktop.png',
'http://seanpatrick.nyc/Assets/Pensive/PensiveSketches.png',
'http://seanpatrick.nyc/Assets/Pensive/TitlePage.png',
'http://seanpatrick.nyc/Assets/Pensive/AdminInput.png',
'http://seanpatrick.nyc/Assets/Pensive/VRPrototypeREAL.png',
"https://scontent.fnyc1-1.fna.fbcdn.net/v/t31.0-8/28161920_1701405043214922_2834138420788631490_o.jpg?_nc_cat=108&oh=44040589e2c0aeaf06f5f1c1e320f773&oe=5C21C928"];


const MESHD = ['http://seanpatrick.nyc/Assets/MESHD/MESHD.png',
'http://seanpatrick.nyc/Assets/MESHD/LogoIterations.png',
'http://seanpatrick.nyc/Assets/MESHD/WireframeSketch.png',
'http://seanpatrick.nyc/Assets/MESHD/MHIFIDesktop.png',
'http://seanpatrick.nyc/Assets/MESHD/MESHDad.png',
'http://seanpatrick.nyc/Assets/MESHD/Final.png',
'http://seanpatrick.nyc/Assets/MESHD/MESHDTeam.png',
'http://seanpatrick.nyc/Assets/MESHD/Excelsior.png',];

const LitterRats = ['http://seanpatrick.nyc/Assets/LitterRats.png']


class App extends Component {
  constructor(props) {
     super(props);
     this.state = {
       width:'0px',
       height:'0px',
       entered: false,
       expanded:false,
       GlassMenagerie : GM,
       aboutme:true,
       buttonprops:"CLOSE ABOUT",
       super:this,
       mob:false,
     }
   this.enter= this.enter.bind(this);
   this.openAboutMe = this.openAboutMe.bind(this);
   this.detectmob = this.detectmob.bind(this);
   this.updateWindowDimensions=this.updateWindowDimensions.bind(this);
   }
   componentWillMount(){
     this.setState({width: 1074, height: 503});
   }
   componentDidMount(){
     window.addEventListener('resize', this.updateWindowDimensions());

     this.detectmob();
   }

   componentWillUnmount(){
     window.removeEventListener('resize', this.updateWindowDimensions())
   }
   updateWindowDimensions(){
     this.setState({width: window.innerWidth, height: window.innerHeight});
     this.forceUpdate();

   }

    enter(){
    this.setState({expanded:true});
    this.setState({entered:true});

  }
  detectmob() {
   if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
    this.setState({mob:true});
    }
   else {
      this.setState({mob:false});
    }
  }

      openAboutMe(){
        console.log("called");
        if(this.state.buttonprops === "CLOSE ABOUT"){
          this.setState({buttonprops: "ABOUT"});
        }else{
          this.setState({buttonprops: "CLOSE ABOUT"});
        }
        this.setState({aboutme:!this.state.aboutme});

      }

  render() {


    return (<div>
      { this.state.mob? <div>

      <HeaderTextB height={this.state.height} onClick={this.enter}>SEAN PATRICK</HeaderTextB>
      <SubHeaderTextB height={this.state.height}> Interdisciplinary Experience Designer & Progressive Digital Artist </SubHeaderTextB>
      <CompassText> Hi There! I{"'"}m glad you wanted to check out my portfolio on mobile. However the images on my site are are best viewed on a desktop computer, but here{"'"}s a cool 3D animated sphere!</CompassText>
      <AnimatedSphere/> </div>:

 <div>

      {this.state.entered?
        <SuperDiv >
    <Head entered={this.state.entered}><SubHeaderText height={this.state.height}> Interdisciplinary Experience Designer & Progressive Digital Artist </SubHeaderText>
     <HeaderText>SEAN PATRICK</HeaderText>
      </Head>

       <Buffer/>

        <ROW w={this.state.width} h={this.state.height}>
      <Tile  w={this.state.width} h={this.state.height} title="Glass Menagerie" subtitle="VR Art + Science Simulation" images={GM} >
        <SubHead/>
        <Section>

       <StP>
        Role: VR & UX Developer,
        <br/><br/>
        Problem: How can the research done at Brookhaven National Labs{"'"}s Synchrotron Light Source II be made accessible to the general public.
        <br/><br/>
        Primary Users: Scientists, Artists, Patrons of the Arts and Sciences
        <br/> <br/>
        Deliverables: Artistic Simulation of the Synchrotron Process, Intractable Data.

        </StP>
        <BodyImage src={GM[0]} />
        </Section>
        <Section>

        <StPL>
        Developing the VR UX<br/><br/>
        The Synchrotron is a very advanced piece of scientific equipment operating on the molecular level.
        One thing was clear from the beginning, everything must be made extremely simple for this experience to be useable.
        </StPL>
        <BodyImageR src={GM[1]} />

        </Section>

        <Section>
          <StP>
           A Tale of Useful Abstractions
           <br/><br/>
           So that the user may obtain visual queues from their experiment, the scale of electrons is increased by a factor of about 10^13. This would make
           each electron about the size of a firefly. The result creates a beautiful cloud of rotating electrons.
          </StP>
          <BodyImage src={GM[2]} />
          </Section>
          <Section>
            <StPL>
             Familiar Interfaces in Novel Media
             <br/><br/>
             For many, VR is still a very foreign medium for many. When you couple this with a potentially complex simulator it seems like a recipe for disaster.
            To remedy this, Users are only presented with a futuristic yet familiar computer console to change the settings on for the simulator.
            </StPL>
            <BodyImageR src={GM[3]} />
            </Section>
            <Section>
              <StP>
               Beta:Presentation & Installation
               <br/><br/>
               The Glass Menagerie Beta premiered at Pioneer Works Software for Artists Day 4 in July of 2018. Together with the 3D sculptures of the materials,
               the VR allowed patrons to be included in the process.
              </StP>
              <BodyImage src={GM[6]}/>
              </Section>
              <Section>
                <StPL>
                 Lessons Learned: Expect the unexpected.
                 <br/><br/>
                Glass Menagerie was perhaps the greatest challenge I have faced so far in my career. Not only did it push me into a medium I was not familiar with,
                It also required that I learn an entirely new language (C#). The biggest takeaway from Glass Menagerie was this: anticipate that things will go wrong.
                Do everything you can to anticipate the needs of the user, research, prototype, user personas, etc. Then, when you{"'"}re absolutely sure that you{"'"}ve
                got it right, don{"'"}t stop there. Continue to adjust to your users and be prepared that interactions might not go as choreographed. These opportunities only
                serve to make the experience better.
                </StPL>
                <BodyImageRSP src={GM[5]} top={"-300px"}/>
                </Section>
              <BaseSection><Button target='_blank' href='http://arts.codes/src/glassmenagerie/glassmenagerie.html' color={"#9f7efc"}>More About Glass Menagerie</Button></BaseSection>
  </Tile>

  <Tile w={this.state.width} h={this.state.height} title="Arts.Codes" subtitle="Art Collective Website Re-Work" color={'#000'} images={AC} >

       <SubHead/>
       <Section>
       <StP>
       Role: UX Designer, Web Developer
       <br/><br/>
       Problem: How can Arts.Codes capture the attention of visitors to their website and beautifully display their work on the internet.
       <br/> <br/>
       Users: Collaborators, Curators, Patrons of the Arts.
       <br/> <br/>
       Deliverables: Redesigned Interactive Homepage, new navigation system, WITHOUT Distracting from content.
      </StP>
      <BodyImage src={AC[4]}/>
      </Section>
      <Section>
      <StPL>
      3D Data Art?!
      <br/><br/>
      The best way to immediately grab the attention of visitors to an Art Collective{"'"}s website is to throw some art their way.
      This is an original piece I collaborated with <a href="https://www.instagram.com/m_f_clarke/">Melissa Clarke</a> to create.
      The sculpture was created in Cinema 4D with data parsed from Brookhaven National Labs, web environment, composition, and animation in THREE.js.
      </StPL>
      <BodyImageR src={AC[1]} />
      </Section>
      <Section>
      <StP>
      Let the Content Show-off
      <br/><br/>
      After capturing the audience, any additional content should be presented more or less traditionally.
      Images are presented in a gallery to the left of detailed descriptions of the work.
      </StP>
      <BodyImageSP src={AC[3]} top={"-150px"}/>
      </Section>
      <Section>
      <StPL>
      Easy Access Tab-Menu
      <br/><br/>
      The goal is to make the user feel as if they are reading a futuristic magazine but still be able to navigate the site with ease.
      This directed the creation of an active menu that slides in and out effortlessly and intuitively
      </StPL>
      <BodyImageR src={AC[2]} />

      </Section>
      <Section>
      <StP>
      Lessions Learned: Iterations,Iterations,{"..."},Iterations.
      <br/><br/>
      Sometimes the creative process occurs as more of an explosion than a line. That great {"AHA!"} that makes it all exciting and easy.
      This project stressed the importance of properly harnessing that moment. If an idea seems to burst forth seemingly fully formed,
      proceed with caution. This website took countless iterations to bring it to its current state, even though the concept seemed
      to be a no brainer. The front-page art required days (if not weeks) of subtle tweaking and redesigning to get it to behave in just the right way.
      The menu was the result of countless re-designs and re-works to make it compelling, responsive, and relevant. The {"AHA!"} is an invaluable part of
      the creative process, but in the design world it needs to more closely resemble the controlled explosions found in an engine than that of a bomb.
      </StP>
      <BodyImageSP top={"-250px"} src={AC[0]} />

      </Section>

       <BaseSection><Button top={'50px'} target='_blank' href='http://arts.codes' color={"#0099ff"}>Go to Arts.Codes</Button></BaseSection>
    </Tile>

  <Tile w={this.state.width} h={this.state.height} title="Company Q" subtitle="Customer Engagement System" images={VRWQ} >
      <SubHead/>
      <Section>
      <StP>
        Role: UX Designer
          <br/><br/>
        Problem: How does VR properly leverage its resources to maximize user engagement within the space.
        <br/><br/>
        Users: Company Customers, which primarily consists of three groups: Young Adult, Parents, Persons there for special events
        <br/> <br/>
        Deliverables: Queueing System UX optimization, User Interface Re-Design, Lifecycle & Tech Assessment
      </StP>
      <BodyImage src={VRWQ[0]} />
      </Section>
      <Section>
      <StPL>
        What is it?
          <br/><br/>
          The existing system was initially built to get the company off the ground and provide a way to maintain order.
          The initial system was just a simple RFID based queue that would push a user when they joined the line
          then pop and notify a user when it was their turn.
        <br/>
        <br/><br/>
      </StPL>
      <BodyImageR src={VRWQ[1]} />
      </Section>
      <Section>
      <StP>
        Ok, but we can do better.
          <br/><br/>
        As foot traffic into the space grew, the demand on the system did too.
        The first step was to do an analysis of the existing system and how it fit within the physical space.
        <br/>
        <br/>*Details have been removed from the diagram to protect the IP of Company NYC<br/>
      </StP>
      <BodyImage src={VRWQ[2]} />
      </Section>
      <Section>
      <StPL>
        The thing is...
          <br/><br/>
        Due to the rapid construction of the system, third party software was used to make up for unavailable time. Reliance on this software
        presented many bugs and did not harness the full potential of our resources.
      <br/>
        <br/><br/>
      </StPL>
      <BodyImageR src={VRWQ[5]} />
      </Section>
      <Section>
      <StP>
        A new flow for a new era.
          <br/><br/>
        The user-flow had to be reworked to create a better user-flow through the space. A new queueing system would only partially solve the problems
        the company faced.
        <br/>
        <br/>*Details have been removed from the diagram to protect the IP of Company NYC<br/>
      </StP>
      <BodyImage src={VRWQ[6]} />
      </Section>
      <Section>
      <StPL>
        Understand, Iterate
          <br/><br/>
        The existing system not only missed out on Physical and Logistical assets, It didn{"'"}t make full use of the incredible brand
        developed for the company.
      <br/>
        <br/><br/>
      </StPL>
      <BodyImageR src={VRWQ[7]} />
      </Section>
      <Section>
      <StP>
        Enter: End User Solution
          <br/><br/>
        To quote an ancient proverb; "Theres an app for that!" (Jobs 9:41) A smartphone app makes the experience more personal and familiar.
        Unreliable RFID cards are replaced by adopting more modern alternatives. Users are also presented with real time
        information about the space and returning customers can earn rewards. The design is playful, bombastic, and chic, all while still being
        highly approachable.
      <br/>
        <br/><br/>
      </StP>
      <BodyImageSP src={VRWQ[3]} top={"-300px"}/>
      </Section>
      <Section>
      <StPL>
        Also Enter: In house tablets
          <br/><br/>
        I really can{"'"}t talk much about this one but it has to do with management in the space.
      <br/>
        <br/><br/>
      </StPL>
      <BodyImageR src={VRWQ[4]}/>
      </Section>
      <Section>
      <StP>
        Lessons Learned: Know your audience.
          <br/><br/>
        User Centered Design is one of the key pillars of UX, for obvious reasons.
        This project taught me how work within the scaffolding of client expectation while being an advocate for the user.
        This means knowing exactly to what extent you need to defend a design, and how to do so.
        In the end, the result of this back-and-forth is a much better product.
      <br/>
        <br/><br/>
      </StP>
      <BodyImageSP top={"-350px"} src={VRWQ[0]}/>
      </Section>

  </Tile>
        </ROW>

  <ROW w={this.state.width} h={this.state.height}>


  <Tile w={this.state.width} h={this.state.height} title="Pensive" subtitle="Memory Re-Discovery Platform" color={'#000'} images={PENSIVE}>
  <SubHead/>
   <Section>
          <StP>
           Role: UX Design & Research
           <br/><br/>
            Problem: Therapeutic treatments for individuals with neural-degenerative diseases are limited,
            with the amount of data contained in modern media, what would it take to harness these media
            to provide care for those suffering from memory loss, and what subgroups would actually benefit?
           <br/><br/>
            Users: Individuals suffering from some neural-degenerative diseases
            <br/><br/>
            Deliverables: A System for memory interaction and re-discovery
          </StP>
          <BodyImage src={PENSIVE[4]} />
          </Section>
          <Section>
          <StPL>
                   It all started with a sketch
                   <br/><br/>
                   The challenge was presented to a small group of interns, how can those with neural-degenerative diseases be treated with VR?
                    We immediately began trying to visualize how memories are connected to one another in the brain. Accompanied by the all important
                    initial Google Search. <br/>
                   <br/>
          </StPL>
          <BodyImageR src={PENSIVE[3]} />
          </Section>
          <Section>
          <StP>
                   What{"'"}s in your head?
                   <br/><br/>
                   We began to realize just how complicated and varied the world of Neural Pathology is, even when you narrow the symptoms down to
                   memory loss. User Personification seemed to be the most appropriate method for determining how effective this treatment method could be
                   and more importantly, to whom it would make a difference.
                   <br/>
                   <br/>
          </StP>
          <BodyImage src={PENSIVE[1]} />
          </Section>
          <Section>
          <StPL>
                   That{"'"}s so meta!
                   <br/><br/>
                   With the amount of metadata encoded into media, it could be possible
                    to categorize and group related photos. This would assist in giving
                    the patient media that is closely related, in this way an artificial
                     memory can be created out of multimedia snippets
                   <br/>
          </StPL>
          <BodyImageR src={PENSIVE[2]} />
          </Section>
          <Section>
          <StP>
                   Let{"'"}s talk about The AI
                   <br/>
                   <br/>
                   The AI would need to make use of a Convolutional Neural Network (CNN) to "see" whats
                    in the photo, compare it to the metadata, then cluster related media together.
                    I volunteered to take an ML Class so that I could understand the basics of this process.
                     In this way I was able to speak knowledgeably with the ML team. (Here{"'"}s the result of one of my homeworks)
                   <br/>
          </StP>
          <BodyImage src={PENSIVE[7]} />
          </Section>
          <Section>
          <StPL>
                   Phase One: Supervised AI
                   <br/><br/>
                   The AI needed to be supervised by clinicians to create and administer memory tests for patients.
                    Phase one was to create this environment, gain feedback from clinicians.
                   <br/>
          </StPL>
          <BodyImageR src={PENSIVE[5]} />
          </Section>
          <Section>
          <StP>
                   Phase Two: Ah! the Memories...
                   <br/>
                   <br/>
                    Phase Two required the development of a prototype in VR, To be sure everything would be cross compatible we made use
                    of React VR and the result was reminiscent of the centuries-old "Memory Palace" meditation technique.
                   <br/>
          </StP>
          <BodyImage src={PENSIVE[0]} />
          </Section>
          <Section>
          <StPL>
                   Lessions Learned: DOCUMENT, DOCUMENT, DOCUMENT!
                   <br/><br/>
                   This project was done as part of an internship with CEWIT (not bad for a bunch of interns).
                   The project remains under development even though I graduated in May(2018). CEWIT had two UX interns, including myself.
                   The project lives on ONLY because we documented all that we did while working on it. The litmus test I always use when
                    documenting a project is, "If I had to walk away from this project tomorrow (for whatever reason) would the person following me be able to pick up where I left off?"
                   <br/>
          </StPL>
          <BodyImageRSP top={"-350px"} src={PENSIVE[4]} />
          </Section>
  <BaseSection><Button target='_blank' href='http://cewit.org' color={"#990000"}>More About CEWIT</Button></BaseSection>

      </Tile>
      <Tile w={this.state.width} h={this.state.height} title="MESHD" subtitle="Interdisciplinary Collaboration Network" images={MESHD}>
      <SubHead/>
      <Section>
            <StP>
            Role: Brand Design, UX Design, Marketing
            <br/> <br/>
            Problem: College Students from different areas of study have a difficult time finding collaborators for projects of an Interdisciplinary nature
            <br/><br/>
            Users: College Students and Professors
            <br/><br/>
            Deliverables: A platform for collaborator discovery and networking.
            </StP>
              <BodyImage src={MESHD[4]} />
            </Section>
            <Section>
            <StPL>
             MESHD started out as a class project and grew into so much more.
             <br/> <br/>
             In October of 2016 I started a project that would change my life.
             I was tasked by my web design professor with designing the brand assets for a Campus Social Media Site that would allow students
             from different disciplines to find each-other to collaborate on projects.
             </StPL>
             <BodyImageR src={MESHD[2]} />
             </Section>
             <Section>
             <StP>
              Move Fast and Think things through.
              <br/> <br/>
              The students with the best designs were then selected to work in a group to develop wireframes and begin sketching out how things would work.
              What would be contained within a profile?, how would these students meet and communicate?
              </StP>
              <BodyImage src={MESHD[1]} />
              </Section>
              <Section>
              <StPL>
              Constantly Learning, Constantly Improving
              <br/> <br/>
              We were then introduced to UX, Head first into the deep end. My professor gave us resources and said "come up with some mockups then prototype them".
              She would have the class try them, then tear them down. We{"'"}d try again. More students were added to the team to speed up the process.
               </StPL>
               <BodyImageR src={MESHD[3]} />
               </Section>
               <Section>
               <StP>
                Designers, Make it work!
                <br/> <br/>
                Starting in February things began to really take off, from those early prototypes we created a working beta.
                Due to my public speaking prowess I was tasked with creating an investment deck and presenting it. We received a Talent Grant as well as a few others.
                <br/><br/>
                <Button target='_blank' href='https://docs.google.com/presentation/d/1j3K7NA9cvHs7KlYMNzzknapNB_9wcZgDGkLymxq1x4g/edit?usp=sharing'>Here</Button>
                </StP>
                <BodyImage src={MESHD[5]} />
                </Section>
                <Section>
                <StPL>
                Ever Upwards!
                <br/> <br/>
                In March, we made it to the final round of the Excelsior Coding Challenge and were invited to Facebook NYC.
                Entering into the Coding challenge required a simple pivot from C2C to B2C, that deck can be found
                <br/> <br/>
                <Button target='_blank' href='https://docs.google.com/presentation/d/1aAxv4XiSRo-XoSJjgykekbXwvcvcA1Zzv5iwdG8B9pc/edit?usp=sharing'>Here</Button>
                 </StPL>
                 <BodyImageR src={MESHD[7]} />
                 </Section>
               <Section>
               <StP>
               Lessons Learned: Move Fast, Break Things (then fix them), Question Everything.
               <br/> <br/>
                In this project I wore many hats, did many things, and learned a whole lot.
                The first thing I learned is that no goal is too lofty. As a rag-tag group
                of college students in an era where dorm-room startups were going out of vogue
                in favor of Silicon Valley Unicorns, it seemed as if the moment for such a thing had passed.
                That didn{"'"}t stop us. All-nighters were pulled and prototypes were developed.
                 This was an early lesson of the importance of teamwork and communication. I carry this lesson today and incorporate positive communication
                 and dialogue into every team I belong to.
                </StP>
                <BodyImageSP top={"-400px"} src={MESHD[6]} />
                </Section>

                <BaseSection><Button target='_blank' href='http://stonybrook.edu/meshd' color={"#FF4157"}>Go to MESHD</Button></BaseSection>
        </Tile>
        <Tile w={this.state.width} h={this.state.height} title="LitterRats" subtitle="Friendly Cybernetic Trash Solution" color={'#000'} images={LitterRats}>
        <SubHead/>
              <Section>
              <StP>
              <NButton s={true}>Coming Soon</NButton>
              <br/><br/>
              Role: Project Leader
              <br/><br/>
              Overview:LitterRats is a creative application of robotics for the location and removal of litter in public places.  LitterRats makes use
              of machine learning, e-noses(computer smell), and computer vision to work as a unit and beautify the human ecosystem. The careful application of benevolent AI looks for fresh solutions to the issues that humanity faces.
              </StP>
              <BodyImage src={LitterRats[0]} />
              </Section>
          </Tile>





  </ROW>


        <Foot/>
        <Foot>
        made in NYC using React and Styled-Components <br/>
        ©2018 sean patrick
        <br/><br/>
        <Button nah={true} color={"#FFF"} s={true} target='_blank' href='https://linkedin.com/in/sean-patrick-168397b0/' >LinkedIn</Button>{"       "}
        <Button nah={true} color={"#FFF"} s={true} target='_blank' href='https://www.instagram.com/uxsandsketches/' >Instagram</Button><br/><br/>


        </Foot>
        <Foot/>
        </SuperDiv>
        : <div>

        <HeaderTextB height={this.state.height} onClick={this.enter}>SEAN PATRICK</HeaderTextB>
        <SubHeaderTextB height={this.state.height}> Interdisciplinary Experience Designer & Progressive Digital Artist </SubHeaderTextB>
        <CompassText> I am a quick-witted, curious, and progressive human who is driven out of bed in the morning
         by an insatiable desire to understand how the world fits together.<br/> <br/>
         I feed this passion by creating
         meaningful experiences that allow people to access their environment, and by extension, each other  <Button  color={"#FFF"} s={true} onClick={this.enter}>ENTER</Button></CompassText>
        <AnimatedSphere/> </div>
      }
   </div>}
</div>
    );

  }
}




export default App;

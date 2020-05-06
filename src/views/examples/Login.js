/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Flip from 'react-reveal/Flip';
import axios from "axios";
import ReactLoading from "react-loading";

import SimpleFooter from "components/Footers/SimpleFooter.js";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Modal
} from "reactstrap";


class Login extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  toggleErro = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  constructor(props) {
    super(props);
    this.state = { 
      show: true,
      done: "none",
      erro: true,
      display: "fixed",
      musica:[],
      prop:[],
      urlRequest:[],
      imagem:[]
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ urlRequest: e.target.value });
    console.log(e.target.value)
  }

  handleClick() {
    this.setState({ done: "block" }); 
    this.setState({ show: !this.state.show });
    axios.post('/api/top/', {
      top: "37i9dQZEVXbMDoHDwVN2tF" 
    }).then((r) =>{ 
      console.log(r) 
      axios.post('/api/musica/', {
        musica: this.state.urlRequest 
      })
      .then((response) => {
        console.log(response)
        const musica = [response.data.features[0]]
        this.setState({ musica:musica });
        axios
        .get("/api/comp/")
        .then(res=>{
          console.log(res)
          document.documentElement.scrollTop = 0;
          document.scrollingElement.scrollTop = 0;
          this.refs.main.scrollTop = 0;
          const prop = [res.data];
          this.setState({ prop });
          this.setState({ done: true });
          this.setState({ display: "none" });
          this.setState({ done: "none" }); 
        }); 
      }, (error) => {
        console.log(error);
        this.setState({ done: "none" }); 
        this.setState({ erro: !this.state.erro })
      });
    },(error) => {
      console.log(error);
      this.setState({ erro: !this.state.erro })
      this.setState({ done: "none" }); 
    });
  }
  render() {
    return (
      <>
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={!this.state.inicialModal}
          toggle={() => this.toggleModal("inicialModal")}
        >
          <div className="modal-header">
            <h6 className="modal-title" id="modal-title-notification">
              Como Utilizar
            </h6>
            <button
              aria-label="Close"
              className="close"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("inicialModal")}
            >
              <span aria-hidden={true}>×</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="py-3 text-center">
              <img className="maximo-gif" 
                alt="..."
                src={require("assets/img/icons/common/tutor.gif")}
              />
            </div>
          </div>
          <div className="modal-footer">
            <Button className="btn-white" color="default" type="button" target="_blank" href="https://www.linkedin.com/in/renan-bispo-da-silva-01461555/">
              Saiba Mais
            </Button>
            <Button
              className="text-white ml-auto"
              color="link"
              data-dismiss="modal"
              type="button"
              onClick={() => this.toggleModal("inicialModal")}
            >
              Ok!
            </Button>
          </div>
        </Modal>
                 
        {/* <DemoNavbar /> */}
        <Modal
          className="modal-dialog-centered modal-danger"
          contentClassName="bg-gradient-danger"
          isOpen={!this.state.erro}
        >
          <div className="text-center">
            Este Link não possui dados disponiveis pelo Spotify <br></br>
            <Button
              className="my-4"
              color="success"
              type="button"
              href="/"
            >
            Tente Novamente
            </Button>
          </div>
        </Modal>
        <main ref="main" class="bg-gradient-default">
          {/* <section className="section section-shaped section-lg"> */}
          <Container className="pt-lg-7" style = {{display: this.state.done}}>
            <Row className="justify-content-center">
              <Row lg="5">
                <div className="btn-wrapper text-center">
                  <Col md="6">
                    <ReactLoading type={"bars"} color={"white"} />
                  </Col>
                </div>
              </Row>
            </Row>
          </Container>
            <div className="shape shape-style-1 bg-gradient-default">
            </div>
              {this.state.prop.map((s) => {
                console.log({s})
                return(
                  <>                             
                  <Container className="pt-lg-7">
                    <Row className="justify-content-center">
                      <Col lg="5">
                        <Card className="bg-secondary shadow border-0">
                          <div className="btn-wrapper text-center">
                             <Row md="6">
                              <Button
                                block
                                // className="mb-3"
                                color="success"
                                type="button"
                                onClick={() => this.toggleModal("notificationModal")}
                              >
                                Similaridade de {Number(s.dist_parecidas*100).toFixed(2)}%
                              </Button>
                              <Button
                                block
                                // className="mb-3"
                                color="success"
                                type="button"
                                onClick={() => this.toggleModal("notificationModal")}
                              >
                                Principal caracteristica similar: {s.caracteristica}
                              </Button>
                              <Button
                                block
                                // className="mb-5"
                                color="primary"
                                type="button"
                                onClick={() => this.toggleModal("notificationModal")}
                              >
                                Saiba Mais
                              </Button>
                              <Modal
                                className="modal-dialog-centered modal-danger"
                                contentClassName="bg-gradient-danger"
                                isOpen={this.state.notificationModal}
                                toggle={() => this.toggleModal("notificationModal")}
                              >
                                <div className="modal-header">
                                  <h6 className="modal-title" id="modal-title-notification">
                                    Informações Detalhadas
                                  </h6>
                                  <button
                                    aria-label="Close"
                                    className="close"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                  >
                                    <span aria-hidden={true}>×</span>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div className="py-3 text-center">
                                    <i className="ni ni-bell-55 ni-3x" />
                                  </div>
                                  <div className="py-3">
                                    <h4 className="heading mt-4">Caracteristicas Similares</h4>
                                    <li>
                                      {s.nomes.danceability} = {(1-(Number(s.dist[0][0]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.energy} = {(1-(Number(s.dist[0][1]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.loudness} = {(1-(Number(s.dist[0][2]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.speechiness} = {(1-(Number(s.dist[0][3]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.acousticness} = {(1-(Number(s.dist[0][4]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.instrumentalness} = {(1-(Number(s.dist[0][5]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.liveness} = {(1-(Number(s.dist[0][6]).toFixed(0)))*100}%
                                      </li>
                                    <li>
                                      {s.nomes.valence} = {(1-(Number(s.dist[0][7]).toFixed(0)))*100}%
                                    </li>
                                    <li>
                                      {s.nomes.tempo} = {(1-(Number(s.dist[0][8]).toFixed(0)))*100}%
                                    </li>
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  <Button className="btn-white" color="default" type="button" href="https://www.linkedin.com/in/renan-bispo-da-silva-01461555/">
                                    Saiba Mais
                                  </Button>
                                  <Button
                                    className="text-white ml-auto"
                                    color="link"
                                    data-dismiss="modal"
                                    type="button"
                                    onClick={() => this.toggleModal("notificationModal")}
                                  >
                                    Sair
                                  </Button>
                                </div>
                              </Modal>
                            </Row>
                            <spam>{s.musica.track.name}  </spam>
                            <spam>{s.musica.track.artists[0].name}</spam>
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              href={s.musica.track.external_urls.spotify}
                            >
                              <img
                                className="maximo rounded-circle" 
                                alt="..."
                                src={s.musica.track.album.images[1].url}
                              />
                            </Button>
                          </div>
                          <div className="text-center">
                            <Button
                              className="my-4"
                              color="success"
                              type="button"
                              href="/"
                            >
                            Fazer outra Busca
                            </Button>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </Container>
                  }
                  </>
                )
              })}
            <div style={{display: this.state.display}}>
              <Flip left when={this.state.show} >
                <Container className="pt-lg-7">
                  <Row className="justify-content-center">
                    <Col lg="5">
                      <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-white pb-5">
                          <div className="text-muted text-center mb-3">
                            <h3>Adicione um link de compartilhamento Spotify da sua Música</h3>
                          </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                          <Form role="form" onSubmit={this.handleSubmit}>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText>
                                    <i className="ni ni-headphones" />
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input placeholder="Link" type="url" onChange={ this.handleChange }/>
                              </InputGroup>
                            </FormGroup>
                            <div className="text-center">
                              <Button
                                className="my-4"
                                color={ !this.state.erro ? 'error' : "success" }
                                type="button"
                                onClick={this.handleClick}
                                disabled={!this.state.show}
                              >
                              { !this.state.erro ? 'Algo deu Errado' : 'Fazer Busca' }
                              </Button>
                            </div>
                          </Form>
                          <div className="btn-wrapper text-center">
                            <Button
                              className="btn-neutral btn-icon"
                              color="default"
                              href="#pablo"
                              onClick={e => e.preventDefault()}
                            >
                              <span>
                                <img className="maximo" 
                                  alt="..."
                                  src={require("assets/img/icons/common/spot.svg")}
                                />
                              </span>
                            </Button>
                          </div>
                        
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Flip>
            </div>
          {/* </section> */}
          <SimpleFooter />
        </main>
      </>
    );
  }
}

export default Login;

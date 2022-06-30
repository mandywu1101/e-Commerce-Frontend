import Carousel from 'react-bootstrap/Carousel';
import topBanner1 from './topBanner1.png';
import topBanner2 from './topBanner2.png';
import topBanner3 from './topBanner3.png';

function IndividualIntervalsExample() {
    return (
        <Carousel>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={topBanner1}
                    alt="First slide"
                />
                {/*<Carousel.Caption>*/}
                {/*    <h3>First slide label</h3>*/}
                {/*    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={topBanner2}
                    alt="Second slide"
                />
                {/*<Carousel.Caption>*/}
                {/*    <h3>Second slide label</h3>*/}
                {/*    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={topBanner3}
                    alt="Third slide"
                />
                {/*<Carousel.Caption>*/}
                {/*    <h3>Third slide label</h3>*/}
                {/*    <p>*/}
                {/*        Praesent commodo cursus magna, vel scelerisque nisl consectetur.*/}
                {/*    </p>*/}
                {/*</Carousel.Caption>*/}
            </Carousel.Item>
        </Carousel>
    );
}

export default IndividualIntervalsExample;
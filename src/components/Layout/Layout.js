import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import Header from '../../components/Navigation/Header/Header';
import SlideMenu from '../../components/Navigation/SlideMenu/SlideMenu';
import Overlay from '../../components/UI/Overlay/Overlay';

const layout = (props) => (
    <Aux>
        <Header />
        <Overlay />
        <SlideMenu />
        <main className="container mx-auto lg:mt-24">
            {props.children}
        </main>
    </Aux>
);

export default layout;

import { useState } from 'react'

import ImageModal from '../components/ImageModal'
import Backdrop from '../components/Backdrop'
import IlloItem from '../components/IlloItem'

const illoItems = [
    {
        id: "eclipse",
        img: "./img/illos/illo_0",
        caption: "Eclipse | ANTIGRAVITY Magazine | 2017"
    },
    {
        id: "orleansDA",
        img: "./img/illos/illo_1",
        caption: "Orleans Parish DA | ANTIGRAVITY Magazine | 2017"
    },
    {
        id: "voter-guide-00",
        img: "./img/illos/illo_2",
        caption: "Voter Guide NOLA | ANTIGRAVITY Magazine | 2017"
    },
    {
        id: "voter-guide-01",
        img: "./img/illos/illo_3",
        caption: "Voter Guide NOLA | ANTIGRAVITY Magazine | 2017"
    },
    {
        id: "voter-guide-02",
        img: "./img/illos/illo_4",
        caption: "Voter Guide NOLA | ANTIGRAVITY Magazine | 2017"
    },
    {
        id: "gds-cover",
        img: "./img/illos/illo_5",
        caption: "GDS Quarterly Cover | Summer 2019"
    },
    {
        id: "gds-00",
        img: "./img/illos/illo_6",
        caption: "The Cost of Bad Communication | GDS Quarterly | 2019"
    },
    {
        id: "gds-01",
        img: "./img/illos/illo_7",
        caption: "Communication Obstacles | GDS Quarterly | 2019"
    },
    {
        id: "two-step",
        img: "./img/illos/illo_8",
        caption: "Two Steppin' | Sculpture | Show Flyer"
    },
    {
        id: "grin",
        img: "./img/illos/illo_9",
        caption: "This Guy's a Grinning | Painting | Show Flyer"
    },
    {
        id: "parade",
        img: "./img/illos/illo_10",
        caption: "Parade Flyer | Ink | Parade Flyer"
    },
    {
        id: "busker",
        img: "./img/illos/illo_11",
        caption: "Busker Trash | Ink | Show Flyer"
    },
    {
        id: "pedal",
        img: "./img/illos/illo_12",
        caption: "Pedal Steel | Ink | Show Flyer"
    },
    {
        id: "bill-cassidy",
        img: "./img/illos/illo_13",
        caption: "Portrait | Sen. Bill Cassidy"
    },
    {
        id: "pat-toomey",
        img: "./img/illos/illo_14",
        caption: "Portrait | Sen. Pat Toomey"
    },
    {
        id: "old-man",
        img: "./img/illos/illo_15",
        caption: "Old Man | Ink | Personal"
    },
    {
        id: "yoga",
        img: "./img/illos/illo_16",
        caption: "Triangle Pose | Ink | Personal"
    },
    {
        id: "zydeco",
        img: "./img/illos/illo_17",
        caption: "Do the Zydeco | Ink | Personal"
    },
    {
        id: "string-bean",
        img: "./img/illos/illo_18",
        caption: "String Bean String Band | Ink | Personal"
    },
    {
        id: "square-dance",
        img: "./img/illos/illo_19",
        caption: "Old Folks at the Square Dance | Ink | Personal"
    },
    {
        id: "fais-do-do",
        img: "./img/illos/illo_20",
        caption: "Fais Do Do | Ink | Personal"
    },
    {
        id: "have-not-01",
        img: "./img/illos/illo_21",
        caption: "Have & Have Not 1/6 | Comic | 2016"
    },
    {
        id: "have-not-02",
        img: "./img/illos/illo_22",
        caption: "Have & Have Not 2/6 | Comic | 2016"
    },
    {
        id: "have-not-03",
        img: "./img/illos/illo_23",
        caption: "Have & Have Not 3/6 | Comic | 2016"
    },
    {
        id: "have-not-04",
        img: "./img/illos/illo_24",
        caption: "Have & Have Not 4/6 | Comic | 2016"
    },
    {
        id: "have-not-05",
        img: "./img/illos/illo_25",
        caption: "Have & Have Not 5/6 | Comic | 2016"
    },
    {
        id: "have-not-06",
        img: "./img/illos/illo_26",
        caption: "Have & Have Not 6/6 | Comic | 2016"
    },
    {
        id: "bart",
        img: "./img/illos/illo_27",
        caption: "The Ballad of Bart | Comic | 2017"
    }
];

const IllustrationRoute = () => {

    interface ModalData {
        id: string,
        img: string,
        caption: string
    }

    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState({id: "", img: "", caption: ""});

    function openModalHandler (illoData: ModalData) {
        setOpenModal(true);
        setModalData(illoData);
        document.body.style.overflowY = "hidden";
    }

    function closeModalHandler () {
        setOpenModal(false);
        setModalData({id: "", img: "", caption: ""});
        document.body.style.overflowY = "scroll";
    }

    return (
        <main>
            { openModal ? <ImageModal {...modalData} onClick={closeModalHandler} /> : null }
            { openModal ? <Backdrop onClick={closeModalHandler}/> : null }
            <div className="illo-grid">
                {
                    illoItems.map((item, index) => 
                        <IlloItem key={item.id} {...item} index={index + 4} openModal={openModalHandler} modalState={openModal} />
                    )
                }
            </div>
        </main>
    );
}

export default IllustrationRoute;
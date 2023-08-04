import Modal from 'react-modal';
import { useArcherContext } from '@/utils/ArcherContextProvider.tsx';
import Icon from '@/components/lib/Icon.tsx';
import Button from '@/components/Button.tsx';

Modal.setAppElement('body');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    boxShadow: 'var(--elevation4)',
    border: 'none',
    maxWidth: '543px',
    width: '100%',
    padding: '0',
  },
  overlay: {
    zIndex: 1000,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
};

export default function MainModal() {
  const { mainModalOpen, setMainModalOpen } = useArcherContext();

  function closeModal() {
    setMainModalOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={mainModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="relative">
          <div
            className="absolute top-[24px] right-[24px] cursor-pointer hover:opacity-80 active:opacity-60"
            onClick={closeModal}
          >
            <Icon icon={'modal_x_icon'}></Icon>
          </div>

          <div className="pt-[52px] px-[40px] mb-[8px]">
            <div className="text-[32px] font-extrabold leading-[120%] mb-[24px]">
              Great! You just built your first Squid app:{' '}
              <span className="font-normal">Archer Ticker Tape</span>
            </div>
            <div className="text-16px leading-[20px] font-semibold text-text2 mb-[22px]">
              In the seconds it took to launch this app, Squid spun up a new
              mid-tier for you that’s secure, scalable, and connects to a
              built-in NoSQL database in real time, all with no work required
              from you!
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="basis-[36px]">
                <Icon icon={'tooltip_icon'}></Icon>
              </div>
              <div className="text-16px leading-[20px] font-semibold text-text2">
                Look out for tool tips we’ve left throughout the app to
                understand the power and simplicity of Squid Cloud!{' '}
              </div>
            </div>
          </div>

          <div className="px-[40px] pb-[52px] pt-[79px] w-full h-[169px] bg-main-modal-footer">
            <Button buttonType="modal" className="w-full" onClick={closeModal}>
              Get started
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

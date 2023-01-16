const isShowModalListToken = ref(false);
const isShowLogoutModal = ref(false);
const isShowModalWaitingConfirmTx = ref(false);
const isShowModalTxSubmitted = ref(false);
const isShowModalTxRejected = ref(false);
const waitingModalContent = ref("");
const submittedTxHash = ref("");

export const useModals = () => {
  const setModalListTokenState = (val: boolean) => {
    isShowModalListToken.value = val;
  };
  const setLogoutModalState = (val: boolean) => {
    isShowLogoutModal.value = val;
  };
  const setModalWaitingTxState = (val: boolean, content?: string) => {
    isShowModalWaitingConfirmTx.value = val;
    waitingModalContent.value = content || "";
  };
  const setModalTxSubmitted = (val: boolean, txHash?: string) => {
    isShowModalTxSubmitted.value = val;
    submittedTxHash.value = txHash || "";
  };

  const setModalTxRejected = (val: boolean) => {
    isShowModalTxRejected.value = val;
  };
  return {
    setModalListTokenState,
    setLogoutModalState,
    setModalWaitingTxState,
    setModalTxSubmitted,
    setModalTxRejected,
    isShowModalListToken,
    isShowLogoutModal,
    isShowModalTxSubmitted,
    isShowModalWaitingConfirmTx,
    waitingModalContent,
    submittedTxHash,
    isShowModalTxRejected,
  };
};

export default function UndoRedoPlugin({ store, options }) {
  if (options.undoredo) {
    if (!localStorage.getItem(`history_${store.$id}`)) {
      localStorage.setItem(`history_${store.$id}`, JSON.stringify([]));
      localStorage.setItem(`history_${store.$id}_current`, "0");
    }
    store.$subscribe(() => {
      const history = JSON.parse(localStorage.getItem(`history_${store.$id}`));
      history.push(store.$state);
      localStorage.setItem(`history_${store.$id}`, JSON.stringify(history));
      localStorage.setItem(
        `history_${store.$id}_current`,
        JSON.stringify(history.length)
      );
    });

    store.$onAction(({ name }) => {
      if (name === "redo") {
        const current = JSON.parse(
          localStorage.getItem(`history_${store.$id}_current`)
        );
        const history = JSON.parse(
          localStorage.getItem(`history_${store.$id}`)
        );
        const next = current + 1;
        if (history[next]) {
          store.$state = history[next];

          localStorage.setItem(
            `history_${store.$id}_current`,
            JSON.stringify(next)
          );
        }
      }

      if (name === "undo") {
        const current = JSON.parse(
          localStorage.getItem(`history_${store.$id}_current`)
        );
        const history = JSON.parse(
          localStorage.getItem(`history_${store.$id}`)
        );
        const prev = current - 1;
        if (history[prev]) {
          store.$state = history[prev];

          localStorage.setItem(
            `history_${store.$id}_current`,
            JSON.stringify(prev)
          );
        }
      }
    });
  }
}

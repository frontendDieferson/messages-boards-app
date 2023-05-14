import { useState } from "react";
import { useRouter } from "next/router";
import { createNotice } from "../utils/api";
import styles from "../styles/components/NoticeForm.module.css";

export default function NoticeForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      await createNotice({ title, content });
      router.push("/notices");
    } catch (err) {
      setError("Não foi possível criar o recado, Por favor tente novamente.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Criar Recado</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inpuGroup}>
        <label htmlFor="title">
          Título:
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <div className={styles.inputGroup}>
            <label htmlFor="content">Conteúdo:</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles.actions}>
            <button type="submit">Criar Recado</button>
          </div>
        </label>
      </div>
    </form>
  );
}

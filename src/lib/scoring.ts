export function scoreSingleQuestion(
  correct: number[],
  selected: number[],
  type: 'single' | 'multiple',
  totalOptions: number
): number {
  if (type === 'single') {
    return correct.length === 1 && selected.length === 1 && correct[0] === selected[0] ? 1 : 0
  }
  // Multiple: ½ point per option correctly classified (selected∧correct OR not-selected∧not-correct)
  let hits = 0
  for (let i = 0; i < totalOptions; i++) {
    const shouldSelect = correct.includes(i)
    const didSelect = selected.includes(i)
    if (shouldSelect === didSelect) hits++
  }
  return hits / totalOptions
}

export function scoreQuiz(
  questions: { correct: number[]; type: 'single' | 'multiple'; options: string[] }[],
  answers: number[][]
): number {
  if (questions.length === 0) return 0
  const sum = questions.reduce((acc, q, i) =>
    acc + scoreSingleQuestion(q.correct, answers[i] ?? [], q.type, q.options.length), 0)
  return sum / questions.length
}

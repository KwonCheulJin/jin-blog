interface ExampleData {
  input: string;
  output: string;
  explanation?: string;
}

interface Props {
  examples: ExampleData[];
}

export default function ExamplesSection({ examples }: Props) {
  if (!examples || examples.length === 0) {
    return null;
  }

  return (
    <section className="-mt-2 mb-8">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        예제
      </h3>
      <div className="space-y-4">
        {examples.map((example, index) => (
          <div
            key={index}
            className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <h4 className="mb-2 mt-0 font-semibold text-gray-900 dark:text-gray-100">
              예제 {index + 1}
            </h4>
            <div className="font-mono text-sm">
              <div>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  입력:
                </span>{' '}
                <span className="text-gray-700 dark:text-gray-300">
                  {example.input}
                </span>
              </div>
              <div>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  출력:
                </span>{' '}
                <span className="text-gray-700 dark:text-gray-300">
                  {example.output}
                </span>
              </div>
              {example.explanation && (
                <div>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    설명:
                  </span>{' '}
                  <span className="text-gray-700 dark:text-gray-300">
                    {example.explanation}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
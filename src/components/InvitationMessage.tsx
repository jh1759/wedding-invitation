import { sampleData } from '../data/sample'

export function InvitationMessage() {
  const { message } = sampleData
  const paragraphs = Array.isArray(message) ? message : message.split('\n').filter((p) => p.trim())

  return (
    <section className="section-padding bg-white/50 backdrop-blur-sm">
      <div className="container-max">
        <div className="text-center">
          <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-sm rounded-3xl shadow-soft p-8 md:p-12">
            <h2 className="text-3xl sm:text-4xl font-display font-light mb-12 text-brand-ink tracking-wide">
              초대합니다
            </h2>
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg sm:text-xl text-brand-ink/80 leading-loose tracking-wide whitespace-pre-line"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


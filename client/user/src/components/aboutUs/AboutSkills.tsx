import SkillBar from "./SkillBar"

const SKILLS = [
  { label: 'Web Design', value: 76 },
  { label: 'Development', value: 45 },
  { label: 'Strategy', value: 58 },
  { label: 'Marketing', value: 83 },
]

const AboutSkills = () => {
  return (
    <section className="max-w-7xl mx-auto px-10 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold lowercase">
              shooting campaign
            </h2>
            <div className="w-16 h-[2px] bg-black"/>
          </div>
          <p className="text-gray-500 leading-relaxed max-w-xl">
            Alierewum phaedrum torquatos nec eu, dasvis detraxit etrssa
            periculiser eres fritisi reex,nihdail dexpetendis in mei.
            Meis an lorem tincidunt vix at, vele.adsasx sensibus id,
            errdsaeore rwrepicureri mea et.
          </p>
        </div>
        <div className="space-y-8">
          {SKILLS.map((skill, idx) => (
            <SkillBar key={idx} {...skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default AboutSkills;


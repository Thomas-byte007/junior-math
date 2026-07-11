import type { GradeMeta } from '@/types/content'

export const GRADES: GradeMeta[] = [
  {
    slug: 'grade-7',
    title: '七年级',
    titleShort: '七',
    emoji: '📐',
    color: 'blue',
    description: '从有理数到数据收集，打好初中数学基础',
    chapters: [
      { slug: 'rational-numbers', title: '有理数', description: '正负数、数轴、相反数、绝对值', order: 1, topics: [] },
      { slug: 'algebraic-expressions', title: '整式', description: '单项式、多项式、同类项、去括号', order: 2, topics: [] },
      { slug: 'linear-equations', title: '一元一次方程', description: '方程的解、移项、去分母', order: 3, topics: [] },
      { slug: 'geometry-intro', title: '几何初步', description: '点线面体、角、线段', order: 4, topics: [] },
      { slug: 'intersecting-lines', title: '相交线与平行线', description: '对顶角、同位角、平行线判定与性质', order: 5, topics: [] },
      { slug: 'real-numbers', title: '实数', description: '平方根、立方根、无理数', order: 6, topics: [] },
      { slug: 'coordinate-plane', title: '平面直角坐标系', description: '坐标、象限、点的变换', order: 7, topics: [] },
      { slug: 'linear-systems', title: '二元一次方程组', description: '代入法、加减法、应用题', order: 8, topics: [] },
      { slug: 'inequalities', title: '不等式与不等式组', description: '不等式的性质、解集、数轴表示', order: 9, topics: [] },
      { slug: 'data-collection', title: '数据的收集、整理与描述', description: '统计图、频数、直方图', order: 10, topics: [] },
    ],
  },
  {
    slug: 'grade-8',
    title: '八年级',
    titleShort: '八',
    emoji: '📏',
    color: 'emerald',
    description: '从三角形到一次函数，建立几何与代数的桥梁',
    chapters: [
      { slug: 'triangles', title: '三角形', description: '内角和、三边关系、高线中线角平分线', order: 1, topics: [] },
      { slug: 'congruent-triangles', title: '全等三角形', description: 'SSS/SAS/ASA/AAS/HL 判定', order: 2, topics: [] },
      { slug: 'symmetry', title: '轴对称', description: '垂直平分线、等腰三角形、最短路径', order: 3, topics: [] },
      { slug: 'polynomial-factoring', title: '整式的乘法与因式分解', description: '幂运算、乘法公式、十字相乘法', order: 4, topics: [] },
      { slug: 'fractions', title: '分式', description: '分式运算、分式方程、增根', order: 5, topics: [] },
      { slug: 'quadratic-radicals', title: '二次根式', description: '最简二次根式、分母有理化', order: 6, topics: [] },
      { slug: 'pythagorean', title: '勾股定理', description: '直角三角形、勾股数、逆定理', order: 7, topics: [] },
      { slug: 'parallelograms', title: '平行四边形', description: '矩形、菱形、正方形判定与性质', order: 8, topics: [] },
      { slug: 'linear-functions', title: '一次函数', description: '正比例函数、图像、待定系数法', order: 9, topics: [] },
      { slug: 'data-analysis', title: '数据的分析', description: '平均数、中位数、众数、方差', order: 10, topics: [] },
    ],
  },
  {
    slug: 'grade-9',
    title: '九年级',
    titleShort: '九',
    emoji: '🧮',
    color: 'purple',
    description: '从二次函数到三角函数，冲刺中考',
    chapters: [
      { slug: 'quadratic-equations', title: '一元二次方程', description: '判别式、求根公式、韦达定理', order: 1, topics: [] },
      { slug: 'quadratic-functions', title: '二次函数', description: '顶点式、图像性质、最值问题', order: 2, topics: [] },
      { slug: 'rotation', title: '旋转', description: '中心对称、旋转作图', order: 3, topics: [] },
      { slug: 'circles', title: '圆', description: '垂径定理、圆周角、切线与圆', order: 4, topics: [] },
      { slug: 'probability', title: '概率初步', description: '列举法、树状图、频率估计概率', order: 5, topics: [] },
      { slug: 'inverse-proportion', title: '反比例函数', description: '图像性质、k的几何意义', order: 6, topics: [] },
      { slug: 'similarity', title: '相似', description: '相似三角形判定、位似', order: 7, topics: [] },
      { slug: 'trigonometry', title: '锐角三角函数', description: '正弦余弦正切、解直角三角形', order: 8, topics: [] },
      { slug: 'projection-views', title: '投影与视图', description: '三视图、投影', order: 9, topics: [] },
    ],
  },
]

export const GRADE_COLORS: Record<string, { bg: string; bgLight: string; text: string; border: string; darkBg: string }> = {
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-500',
    darkBg: 'dark:bg-blue-950',
  },
  emerald: {
    bg: 'bg-emerald-500',
    bgLight: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-500',
    darkBg: 'dark:bg-emerald-950',
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-500',
    darkBg: 'dark:bg-purple-950',
  },
}

export const GRADE_MAP: Record<string, GradeMeta> = Object.fromEntries(
  GRADES.map((g) => [g.slug, g])
)

export function getGradeBySlug(slug: string): GradeMeta | undefined {
  return GRADE_MAP[slug]
}

export function getChapterMeta(gradeSlug: string, chapterSlug: string) {
  const grade = getGradeBySlug(gradeSlug)
  return grade?.chapters.find((c) => c.slug === chapterSlug)
}

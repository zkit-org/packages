"use client";

import '@/plugin/locales'
import {Editor} from "@easykit/editor";
import { useEffect, useState } from 'react'

export default function Home() {
  const obj = {
    type: 'doc',
    content: [
      {
        type: 'heading',
        attrs: {
          textAlign: 'left',
          id: 'dMeKNpOCKwgSsSokTkWrn',
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: '概述',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: '6W5O-xc2hXJop9L1c1ET6',
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
              {
                type: 'italic',
              },
              {
                type: 'strike',
              },
              {
                type: 'underline',
              },
            ],
            text: '李彦宏',
          },
          {
            type: 'text',
            text: '分析，智能体就像互联网时代的网站11，门槛足够低，',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'underline',
              },
            ],
            text: '“当时看网站是怎么做出来的？通过浏览器一看源代码，非常简单，稍微改一点，我也可以做出来，今天做智能体跟这个很类似……起个名字，告诉它回答什么、不回答什么，就做成了。”',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'n-UJVlya-gUl3yVWWCAXX',
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: '“生成式人工智能，我更看好的方向是什么呢？是智能体（Agent）。”',
          },
          {
            type: 'text',
            text: '近日，百度创始人、董事长兼首席执行官李彦宏在“亚布力成长计划-走进百度”活动上表示，智能体是AI时代的网站，将会有几百万、甚至更大量的智能体出现，形成庞大生态。',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'ByddsiCBllgsTNbOjOmeE',
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'link',
                attrs: {
                  href: 'https://www.baidu.com/',
                  target: '_blank',
                  rel: 'noopener noreferrer nofollow',
                  class: 'link',
                },
              },
            ],
            text: '他指出，智能体将会大量出现、形成生态。“未来，在各行各业、各个领域都会依据自己具体的场景，根据自己特有的经验、规则、数据，做出来这些智能体。”',
          },
        ],
      },
      {
        type: 'blockquoteFigure',
        attrs: {
          id: 'bfjfh7j1_ODn9IomWGxEL',
        },
        content: [
          {
            type: 'quote',
            content: [
              {
                type: 'text',
                text: '他指出，智能体将会大量出现、形成生态。“未来，在各行各业、各个领域都会依据自己具体的场景，根据自己特有的经验、规则、数据，做出来这些智能体。”',
              },
            ],
          },
          {
            type: 'quoteCaption',
            content: [
              {
                type: 'text',
                text: '李彦宏',
              },
            ],
          },
        ],
      },
      {
        type: 'codeBlock',
        attrs: {
          id: 'ce8qfbvb4m9QsFdGz9Oao',
          language: null,
        },
        content: [
          {
            type: 'text',
            text: 'export type TextMenuProps = {\n  editor: Editor\n}',
          },
        ],
      },
      {
        type: 'bulletList',
        attrs: {
          id: 'lqW5i00ZBFlBFcvvBHQyf',
        },
        content: [
          {
            type: 'listItem',
            attrs: {
              id: 'YIilnntTs_nUOa_Dp7GWn',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: '0vZ_OMPaePW-rQnJHAfIe',
                },
                content: [
                  {
                    type: 'text',
                    text: '条目',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            attrs: {
              id: '4Rm77dz-NxucGisGyL__J',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'Y0xw7bflYnEh1iSf2VLQq',
                },
                content: [
                  {
                    type: 'text',
                    text: '质量',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            attrs: {
              id: 'zI9s7Qdb5j4bJjQq6zLcT',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'fxgPZo0AHJqG30zCxNLvv',
                },
                content: [
                  {
                    type: 'text',
                    text: '发展',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'orderedList',
        attrs: {
          id: 'dC2cgmFs5N904PV4O4D1H',
          start: 1,
        },
        content: [
          {
            type: 'listItem',
            attrs: {
              id: 'L_byUZewnNfXo_4t6un3S',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'SgebDJ_1W5M-bFnX1DIxs',
                },
                content: [
                  {
                    type: 'text',
                    text: '如果说的不对，它能自己想想哪儿错了',
                  },
                ],
              },
            ],
          },
          {
            type: 'listItem',
            attrs: {
              id: 'KamDCeuLm66twhcdW13k7',
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'Zf07ACY04lpJ4iw9AgxzU',
                },
                content: [
                  {
                    type: 'text',
                    text: '它还有规划能力，为了实现目的，能规划要调用什么工具。',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          textAlign: 'left',
          id: 'LBsESXA2nlGF4RALjGwh9',
          level: 3,
        },
        content: [
          {
            type: 'text',
            text: '待办任务',
          },
        ],
      },
      {
        type: 'taskList',
        attrs: {
          id: 'j4i4I9idPDjYbFq0h8y9M',
        },
        content: [
          {
            type: 'taskItem',
            attrs: {
              id: 'FdnD9RY6DS7-UnWRPEKsP',
              checked: true,
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'abEgXT13eJqwROddgZE9H',
                },
                content: [
                  {
                    type: 'text',
                    text: '需求',
                  },
                ],
              },
            ],
          },
          {
            type: 'taskItem',
            attrs: {
              id: 'uXbry10VtL1ZQUsDKhzcf',
              checked: true,
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'yl7d8KzWkhDUU08-ybOLk',
                },
                content: [
                  {
                    type: 'text',
                    text: '设计',
                  },
                ],
              },
            ],
          },
          {
            type: 'taskItem',
            attrs: {
              id: 'QziupN7msbq-wOZV8tejG',
              checked: false,
            },
            content: [
              {
                type: 'paragraph',
                attrs: {
                  class: null,
                  textAlign: 'left',
                  id: 'xS7h-W_KWHhE1N0uD1Gu7',
                },
                content: [
                  {
                    type: 'text',
                    text: '研发',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'heading',
        attrs: {
          textAlign: 'left',
          id: 'eejeMSSXpaDahZCuSTN3o',
          level: 2,
        },
        content: [
          {
            type: 'text',
            text: '介绍',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'dsCyglygC8mJvezbDUU8q',
        },
        content: [
          {
            type: 'text',
            text: '智能体不仅能对话，还具备反思和规划能力，“如果说的不对，它能自己想想哪儿错了；它还有规划能力，为了实现目的，能规划要调用什么工具。”李彦宏表示，智能体的这些能力正在逐步完善、门槛也足够低，随着基础大模型能力增强，将诞生更多有价值的应用。',
          },
        ],
      },
      {
        type: 'table',
        attrs: {
          id: 'IeRUGRkdUvgeQvi6KTtpv',
        },
        content: [
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [95],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'WZJVbxplN6A662hKviKeB',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '222',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [474],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'AF0bSGaQCZqmNqJHAFc7Q',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '333',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: '6noqtWjbKvUyBwJ3eeKf3',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '212',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [95],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'Hay2M5Cy6VZxW32O16QlX',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '1',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [474],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'rF_G3z1CAsFu2xsVbi9q-',
                    },
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'm5FEO3Iadhf6_WlIJM8Ft',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [95],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'LrG1uTfoB0YN1B0fFkh9f',
                    },
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [474],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'DF7_KP9cTTyUFDvL-RIr9',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '2',
                      },
                    ],
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'oN7JLvxftjivPSLL66NEO',
                    },
                  },
                ],
              },
            ],
          },
          {
            type: 'tableRow',
            content: [
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [95],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: 'GESsp5pQ1--JCHc6Z70Zr',
                    },
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: [474],
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: '9Sa0lOILxnqe1WZmH1gMC',
                    },
                  },
                ],
              },
              {
                type: 'tableCell',
                attrs: {
                  colspan: 1,
                  rowspan: 1,
                  colwidth: null,
                  style: null,
                },
                content: [
                  {
                    type: 'paragraph',
                    attrs: {
                      class: null,
                      textAlign: 'left',
                      id: '3Vz5dSp5OuTwVFRjwUHBX',
                    },
                    content: [
                      {
                        type: 'text',
                        text: '3',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'DtQFJGMqc4nkbtymE4-R8',
        },
        content: [
          {
            type: 'text',
            text: '展望未来，他分析说，智能体或许还将具备协作能力，“有些复杂的任务，可以通过多个智能体来完成，就像公司里有CEO，还有财务、技术、销售主管，他们协作起来，能完成一个非常复杂的任务。”他认为，如果多个智能体能协作来完成复杂任务，这将会对智能体生态的发展形成极大推动。',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'xqiE9iD2dnS6zEB35jEll',
        },
        content: [
          {
            type: 'text',
            text: '谈及企业做智能体的方向，李彦宏表示，如果仅仅是针对理解、生成、逻辑和记忆等大模型基础能力做改进或集成，则价值不大；但在各个不同场景中，发挥特有的数据优势，就能逐渐积累出自身的竞争优势。',
          },
        ],
      },
      {
        type: 'horizontalRule',
        attrs: {
          id: 'Br4VXi8IXN3V-Ez-6exn3',
        },
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'hvagDMFXndgqbaUWO2iZk',
        },
        content: [
          {
            type: 'text',
            text: '“大模型对于ToB业务的改造，会是非常深刻和彻底的，比互联网对于ToB的影响力要大一个数量级。”活动上，李彦宏还谈到了生成式AI对ToB市场的影响，他指出，随着时间的推移，大模型在B端的影响会越来越显著，“今天，大模型在B端的影响已经大于C端了。”1',
          },
        ],
      },
      {
        type: 'imageBlock',
        attrs: {
          id: 'rhTW9UO3f9UyGkoIkrYhz',
          src: 'https://clover-assets.oss-cn-beijing.aliyuncs.com/blobs/bb40d3e7690a48525710af4b45822a51',
          width: '50%',
          align: 'left',
        },
      },
      {
        type: 'imageBlock',
        attrs: {
          id: 'IkvT4-B7Tzo7chWw44IWm',
          src: 'https://clover-assets.oss-cn-beijing.aliyuncs.com/blobs/bb40d3e7690a48525710af4b45822a51',
          width: '50%',
          align: 'right',
        },
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: '_X_L-4Kva8LtjDlp-_Ywu',
        },
        content: [
          {
            type: 'text',
            text: '如果仅仅是针对理解、生成、逻辑和记忆等大模型基础能力做改进或集成，则价值不大；但在各个不同场景中，发挥特有的数据优势，就能逐渐积累出自身的竞争优势。',
          },
        ],
      },
      {
        type: 'horizontalRule',
        attrs: {
          id: 'IUp29mmwnvPBBGr1fOGl3',
        },
      },
      {
        type: 'codeBlock',
        attrs: {
          id: 'bCWFmPG1FEfF1Yvx_6npW',
          language: null,
        },
        content: [
          {
            type: 'text',
            text: 'console.log(100)',
          },
        ],
      },
      {
        type: 'paragraph',
        attrs: {
          class: null,
          textAlign: 'left',
          id: 'HSNBdtP2hpiKk_qKKlJSC',
        },
      },
    ],
  }
  const [value, setValue] = useState(JSON.stringify(obj));

  useEffect(() => {
    console.log(JSON.parse(value))
  }, [value])

  return (
    <div className="flex items-start justify-center p-4">
      <div className="m-8 w-full max-w-[860px]">
        <Editor
          value={value}
          onChange={setValue}
          uploadImage={async (file) => {
            console.log('uploadImage', file)
            return await Promise.resolve(
              'https://clover-assets.oss-cn-beijing.aliyuncs.com/blobs/bb40d3e7690a48525710af4b45822a51'
            )
          }}
          slashCommandProps={{
            groups: [
              {
                name: 'ai',
                title: 'AI',
                position: 'start',
                commands: [
                  {
                    name: 'aiWriter',
                    label: 'AI Writer',
                    iconName: 'Sparkles',
                    description: 'Generate text with AI',
                    shouldBeHidden: (editor) => editor.isActive('columns'),
                    action: (editor) => editor.chain().focus(), //.setAiWriter().run(),
                  },
                  {
                    name: 'aiImage',
                    label: 'AI Image',
                    iconName: 'Sparkles',
                    description: 'Generate image with AI',
                    shouldBeHidden: (editor) => editor.isActive('columns'),
                    action: (editor) => editor.chain().focus(), //.setAiImage().run(),
                  },
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  )
}
